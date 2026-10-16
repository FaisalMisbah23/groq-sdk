# Report: building an SDK for Groq with the Voxgig SDK Generator

**Author:** Faisal Misbah
**Date:** 16 October 2026
**Generated SDK:** https://github.com/FaisalMisbah23/groq-sdk (MIT)
**Generator:** `@voxgig/create-sdkgen` 0.30.7, `@voxgig/sdkgen` 4.34.7, Node v24.13.1

## 1. Summary

I generated an unofficial, MIT-licensed SDK for the **Groq** inference API
(`groq.com`) — TypeScript and Python — using the Voxgig SDK generator, verified
it against the offline test suites (all green) and against the **live Groq
API** (list models, load a model, run a chat completion, error handling).

Groq is not in the [voxgig-sdk catalogue](https://github.com/orgs/voxgig-sdk/repositories):
I checked the machine-readable catalogue (`catalog.json`, 637 SDKs) and the slug
`groq` has **0** matches. Groq matches the brief — a SaaS company with a free
tier (the free API key is what made a genuine live test possible).

The generator is genuinely fast and pleasant to drive. The stock output is
high quality, and the two-lever customization model (edit `.sdk/model/...`,
never the generated tree) works exactly as documented — I used it to fix a real
bug in the generated request body and to rebrand the project to my own account,
then regenerated cleanly. I also found two correctness bugs and a modelling
rough edge, detailed below.

## 2. The API and the spec

- **API:** Groq — OpenAI-compatible REST API for fast inference (chat,
  embeddings, audio, models).
- **Auth:** bearer token (`Authorization: Bearer <key>`).
- **Spec:** Groq's official OpenAPI 3.0.1 spec (the one Stainless uses to build
  Groq's own SDKs). 6 paths, 7 operations, 45 schemas.
  Operations: `createChatCompletion`, `createEmbedding`, `createTranscription`,
  `createTranslation`, `listModels`, `retrieveModel`, `deleteModel`.
- I kept the spec verbatim at `groq-openapi.yml` in the repo root.

## 3. What I did, and how long it took

| Step | Command | Wall time |
| --- | --- | --- |
| Scaffold (incl. `npm install`) | `npm create @voxgig/sdkgen@latest -- groq -d ./groq-openapi.yml -o ./groq-sdk -t ts,py -f test` | **1m 15s** (≈1m of that is `npm install`) |
| Generate both SDKs | `cd .sdk && npm run generate` | **9.4s** |
| Build + test TypeScript | `cd ts && npm install && npm run build && npm test` | ≈ 25s |
| Test Python | `cd py && pip install -e . pytest && pytest test/` | ≈ 1m (slow PyPI, one-off) |

The generator itself is well inside a 30-minute budget: scaffolding, generation
and a first green test run are comfortably under five minutes once dependencies
are cached.

## 4. Results

**Offline test suites — all green, no network, no credentials:**

| Target | Result |
| --- | --- |
| TypeScript | **223 passed, 0 failed, 13 skipped** |
| Python | **210 passed, 0 failed, 92 skipped** |

The skips are the live-API scenarios (gated on `GROQ_TEST_LIVE=TRUE`).

**Live calls against the real Groq API, using the generated TypeScript SDK:**

| Call | Result |
| --- | --- |
| `client.Model().list()` | ✅ 11 models returned |
| `client.Model().load({ id: 'whisper-large-v3' })` | ✅ model returned |
| `client.Model().load({ id: 'openai/gpt-oss-120b' })` | ❌ 404 — id contains a `/` (see 5.2) |
| `client.CreateChatCompletion().create({ model, messages })` | ❌ 400 out of the box (see 5.1); ✅ after the model fix |
| Unknown model | ✅ throws `GroqError` with `status: 404`, `code: 'request_status'` |

Both language targets were exercised live: the TypeScript and the Python SDK
each listed models and completed a real chat completion (`openai/gpt-oss-20b`,
reply `pong`, usage reported). The generator's own `voxgig-sdkgen doctor`
reports `.sdk matches the scaffold (0 additive)`, exit 0, after my model edits.

## 5. Issues found

### 5.1 [High] Generated request body drops every field whose name ends in `s`

The generated request transform **singularised** field names that end in `s`.
For `POST /openai/v1/chat/completions`, the mapping apidef produced was:

```
"messages": "`reqdata.message`"      # should be reqdata.messages
"tools":    "`reqdata.tool`"         # should be reqdata.tools
"functions":"`reqdata.function`"     # should be reqdata.functions
"max_tokens":"`reqdata.max_token`"   # ...
"logit_bias":"`reqdata.logit_bia`"
"logprobs":  "`reqdata.logprob`"
"logit_bias", "parallel_tool_calls", "top_logprobs" ...
```

Because the caller sets `reqdata.messages` (not `reqdata.message`), the body
built for a chat call contained only `{"model": "..."}`. The live API replied:

```
400 {"error":{"message":"'messages' : property 'messages' is missing", ...}}
```

So the **headline operation of the SDK did not work**, even though every
generated test passed. That last point is its own finding: the offline
doc-example/entity tests exercise the pipeline against the in-memory mock, which
does not validate the request body, so a broken request body is invisible to
`npm test` / `pytest`. (The generated README's own "Create" example is also
misleading here — see 5.3.)

**Fix applied (the documented way, in the model, not the output):** added an
override in `.sdk/model/guide/guide.aontu` mapping each affected request field to
the correct `reqdata.<field>` path. `npm run generate` then produced the correct
`Config.ts`, and the live chat call succeeded. This is a good demonstration that
the model overlay is a real, working escape hatch — but a user without live
tests would ship a broken SDK. **Worth fixing in apidef's transform derivation.**

### 5.2 [High] Path parameters are not URL-encoded

`GET /openai/v1/models/{model}` is `Model.load()`. Groq model ids contain a slash
(`openai/gpt-oss-120b`). The SDK substitutes the raw parameter into the path:

```
GET /openai/v1/models/openai/gpt-oss-120b   -> 404 Not Found
```

The correct call is `/openai/v1/models/openai%2Fgpt-oss-120b`. The path builder
(`preparePath`) joins parts without encoding parameter values. Any API whose
path parameters can contain reserved characters (slashes, spaces, `#`, `?`) will
generate a client that 404s. `encodeURIComponent` on the substituted value would
fix it.

### 5.3 [Medium] Action endpoints become awkwardly-named entities, with request and response fields merged

apidef names an entity after the operationId when an endpoint is an "action"
rather than a CRUD resource. The result here reads badly:

```
client.CreateChatCompletion()      // POST /openai/v1/chat/completions
client.CreateEmbedding()           // POST /openai/v1/embeddings
client.CreateTranscriptionResponseJson()    // POST /openai/v1/audio/transcriptions
client.CreateTranslationResponseJson()      // POST /openai/v1/audio/translations
client.Model()                     // clean: list / load / remove
```

A developer would expect `client.Chat().create(...)` or
`client.ChatCompletion().create(...)`; the vendor's own product name for these
are "chat completions", "embeddings", "transcriptions". The names also leak the
*response schema* name (`CreateTranscriptionResponseJson`) into the public API.

Related: for each action entity, apidef merges the request and response schemas
into one entity, so the generated **create example passes response-only fields**
as input:

```ts
await client.CreateChatCompletion().create({
  choices: [], created: 1, id: 'example_id', messages: [],
  model: 'example_model', object: 'example_object', usage: {},
})
```

`choices`, `created`, `id`, `object`, `usage` are response fields; a user copying
the doc would send them. A request/response split (or at least documenting which
fields are inputs) would help. This is the single biggest "reads-like-a-human"
gap in the output.

### 5.4 [Low] The spec's `info.title` leaks into the docs

The spec's title is "GroqCloud API Swagger", so the generated README said
"GroqCloud API Swagger client … Learn more about GroqCloud API Swagger at
groq.com" and package descriptions read "…SDK for the GroqCloud API Swagger
public API". Overridable via `main.kit.text: title/summary` in `project.aontu`
(which I did), but a nicer default would fall back to the model name when the
spec title looks like a generator artefact.

### 5.5 [Low] Rebranding to a non-default publisher needs several overrides, and `origin` is not covered

The generated repo targets the `voxgig-sdk` org by default. To make it a
coherent project in **my** account I had to set, in `project.aontu`:
`main.kit.repo.path`, `main.kit.publisher`, `main.kit.author`, and per-target
`publish.registry.package`. That works well and is the right lever. The one thing
the overlay does *not* cover is the top-level `origin` key (used for npm scopes
and the default repo path); it lives in the scaffold-owned `model/sdk.aontu` and
is reverted on re-scaffold. A `main.kit.origin` (or including `origin` in the
kept overlay) would complete the story.

## 6. What worked well (developer experience)

- **One command to scaffold, one to generate.** Deterministic, no drift, no
  credentials needed. `npm run generate` is fast (~9s).
- **Offline tests are real tests.** `test` swaps in an in-memory transport, so
  the whole suite runs with no server and no key. Excellent for CI.
- **Doc examples are executed.** The `readme_examples` test compiles and runs the
  code in the README/REFERENCE, so docs cannot silently rot.
- **The model overlay is the real API.** Both my fixes (the transform bug and the
  rebrand) were three-to-fifteen line edits in `.sdk/model/*.aontu`, followed by
  a clean regenerate. I never edited generated code, and the regeneration
  diff-merged without losing anything.
- **`direct()` and `prepare()`** are good escape hatches for endpoints that are
  not entities, and `prepare()` made debugging the request body trivial.
- **Generated docs and agent guides** (README, REFERENCE, AGENTS.md, CLAUDE.md)
  are thorough and genuinely useful.
- **Regeneration is deterministic.** I cloned the pushed repo, ran
  `npm install && npm run generate` on a clean checkout, and `git status` was
  empty: the same spec produced byte-identical output. That is exactly the
  property the pitch claims, and it held.

## 7. Suggestions

1. **Fix the request-transform singularization** (5.1) in apidef — it silently
   breaks the most common LLM API shape (`messages`, `tools`).
2. **URL-encode path parameters** (5.2).
3. **Give action endpoints a noun-based entity name** and consider splitting
   request/response fields in the generated examples (5.3).
4. **Make the live path easier to trust.** Because the mock does not validate the
   request body, a user can get green tests and a broken client. A request-body
   assertion derived from the schema (even in mock mode) would have caught 5.1.
5. **Cover `origin` in the project overlay** (5.5).

## 8. Reproduce

```bash
git clone https://github.com/FaisalMisbah23/groq-sdk && cd groq-sdk
cd .sdk && npm install && npm run generate
cd ../ts && npm install && npm run build && npm test      # 223 pass
cd ../py && python3 -m venv .venv && . .venv/bin/activate \
  && pip install -e . pytest && pytest test/ -q           # 210 pass
```

## 9. Time

Active steering time was well under the 30-minute box; most of the elapsed time
was `npm install`/`pip install` and reading the toolchain docs. The generator
itself is a few seconds per regenerate.

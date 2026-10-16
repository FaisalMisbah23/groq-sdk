# Groq Python SDK



The Python SDK for the Groq API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CreateChatCompletion()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/FaisalMisbah23/groq-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from groq_sdk import GroqSDK

client = GroqSDK({
    "apikey": os.environ.get("GROQ_APIKEY"),
})
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.CreateChatCompletion().create({"choices": [], "created": 1, "id": "example_id", "messages": [], "model": "example_model", "object": "example_object", "usage": {}})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    models = client.Model().list()
    print([item.data_get() for item in models])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = GroqSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
model = client.Model().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = GroqSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GROQ_TEST_LIVE=TRUE
GROQ_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### GroqSDK

```python
from groq_sdk import GroqSDK

client = GroqSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = GroqSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### GroqSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `CreateChatCompletion` | `(data) -> CreateChatCompletionEntity` | Create a CreateChatCompletion entity instance. |
| `CreateEmbedding` | `(data) -> CreateEmbeddingEntity` | Create a CreateEmbedding entity instance. |
| `CreateTranscriptionResponseJson` | `(data) -> CreateTranscriptionResponseJsonEntity` | Create a CreateTranscriptionResponseJson entity instance. |
| `CreateTranslationResponseJson` | `(data) -> CreateTranslationResponseJsonEntity` | Create a CreateTranslationResponseJson entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity, and return it marked as deleted. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### CreateChatCompletion

| Field | Description |
| --- | --- |
| `choices` | A list of chat completion choices. |
| `created` | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | Number between -2.0 and 2.0. |
| `function_call` | Deprecated in favor of `tool_choice`. |
| `functions` | Deprecated in favor of `tools`. |
| `id` | A unique identifier for the chat completion. |
| `logit_bias` | This is not yet supported by any of our models. |
| `logprobs` | This is not yet supported by any of our models. |
| `max_tokens` | The maximum number of tokens that can be generated in the chat completion. |
| `messages` | A list of messages comprising the conversation so far. |
| `model` | The model used for the chat completion. |
| `n` | How many chat completion choices to generate for each input message. |
| `object` | The object type, which is always `chat.completion`. |
| `parallel_tool_calls` | Whether to enable parallel function calling during tool use. |
| `presence_penalty` | Number between -2.0 and 2.0. |
| `response_format` | An object specifying the format that the model must output. |
| `seed` | If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result. |
| `stop` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | If set, partial message deltas will be sent. |
| `system_fingerprint` | This fingerprint represents the backend configuration that the model runs with. |
| `temperature` | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | Controls which (if any) tool is called by the model. |
| `tools` | A list of tools the model may call. |
| `top_logprobs` | This is not yet supported by any of our models. |
| `top_p` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | Usage statistics for the completion request. |
| `user` | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

Operations: Create.

API path: `/openai/v1/chat/completions`

#### CreateEmbedding

| Field | Description |
| --- | --- |
| `data` | The list of embeddings generated by the model. |
| `encoding_format` | The format to return the embeddings in. |
| `input` | Input text to embed, encoded as a string or array of tokens. |
| `model` | The name of the model used to generate the embedding. |
| `object` | The object type, which is always "list". |
| `usage` | The usage information for the request. |
| `user` | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

Operations: Create.

API path: `/openai/v1/embeddings`

#### CreateTranscriptionResponseJson

| Field | Description |
| --- | --- |
| `text` | The transcribed text. |

Operations: Create.

API path: `/openai/v1/audio/transcriptions`

#### CreateTranslationResponseJson

| Field | Description |
| --- | --- |
| `text` |  |

Operations: Create.

API path: `/openai/v1/audio/translations`

#### Model

| Field | Description |
| --- | --- |
| `created` | The Unix timestamp (in seconds) when the model was created. |
| `id` | The model identifier, which can be referenced in the API endpoints. |
| `object` | The object type, which is always "model". |
| `owned_by` | The organization that owns the model. |

Operations: List, Load, Remove.

API path: `/openai/v1/models`



## Entities


### CreateChatCompletion

Create an instance: `create_chat_completion = client.CreateChatCompletion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `choices` | `list` | A list of chat completion choices. |
| `created` | `int` | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `float` | Number between -2.0 and 2.0. |
| `function_call` | `Any` | Deprecated in favor of `tool_choice`. |
| `functions` | `list` | Deprecated in favor of `tools`. |
| `id` | `str` | A unique identifier for the chat completion. |
| `logit_bias` | `dict` | This is not yet supported by any of our models. |
| `logprobs` | `bool` | This is not yet supported by any of our models. |
| `max_tokens` | `int` | The maximum number of tokens that can be generated in the chat completion. |
| `messages` | `list` | A list of messages comprising the conversation so far. |
| `model` | `str` | The model used for the chat completion. |
| `n` | `int` | How many chat completion choices to generate for each input message. |
| `object` | `str` | The object type, which is always `chat.completion`. |
| `parallel_tool_calls` | `bool` | Whether to enable parallel function calling during tool use. |
| `presence_penalty` | `float` | Number between -2.0 and 2.0. |
| `response_format` | `dict` | An object specifying the format that the model must output. |
| `seed` | `int` | If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result. |
| `stop` | `Any` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `bool` | If set, partial message deltas will be sent. |
| `system_fingerprint` | `str` | This fingerprint represents the backend configuration that the model runs with. |
| `temperature` | `float` | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `Any` | Controls which (if any) tool is called by the model. |
| `tools` | `list` | A list of tools the model may call. |
| `top_logprobs` | `int` | This is not yet supported by any of our models. |
| `top_p` | `float` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `dict` | Usage statistics for the completion request. |
| `user` | `str` | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

#### Example: Create

```python
create_chat_completion = client.CreateChatCompletion().create({
    "choices": [],  # list
    "created": 1,  # int
    "id": "example_id",  # str
    "messages": [],  # list
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```


### CreateEmbedding

Create an instance: `create_embedding = client.CreateEmbedding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` | The list of embeddings generated by the model. |
| `encoding_format` | `str` | The format to return the embeddings in. |
| `input` | `Any` | Input text to embed, encoded as a string or array of tokens. |
| `model` | `str` | The name of the model used to generate the embedding. |
| `object` | `str` | The object type, which is always "list". |
| `usage` | `dict` | The usage information for the request. |
| `user` | `str` | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

#### Example: Create

```python
create_embedding = client.CreateEmbedding().create({
    "data": [],  # list
    "input": "example_input",  # Any
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```


### CreateTranscriptionResponseJson

Create an instance: `create_transcription_response_json = client.CreateTranscriptionResponseJson()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `text` | `str` | The transcribed text. |

#### Example: Create

```python
create_transcription_response_json = client.CreateTranscriptionResponseJson().create({
    "text": "example_text",  # str
})
```


### CreateTranslationResponseJson

Create an instance: `create_translation_response_json = client.CreateTranslationResponseJson()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `text` | `str` |  |

#### Example: Create

```python
create_translation_response_json = client.CreateTranslationResponseJson().create({
    "text": "example_text",  # str
})
```


### Model

Create an instance: `model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `int` | The Unix timestamp (in seconds) when the model was created. |
| `id` | `str` | The model identifier, which can be referenced in the API endpoints. |
| `object` | `str` | The object type, which is always "model". |
| `owned_by` | `str` | The organization that owns the model. |

#### Example: Load

```python
model = client.Model().load({"id": "model_id"})
```

#### Example: List

```python
models = client.Model().list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── groq_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`groq_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
model = client.Model()
model.list()

# model.data_get() now returns the model data from the last list
# model.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

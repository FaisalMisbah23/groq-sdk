# Groq TypeScript SDK



The TypeScript SDK for the Groq API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CreateChatCompletion()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/FaisalMisbah23/groq-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/FaisalMisbah23/groq-sdk
npm install ./groq-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { GroqSDK } from '@faisalismisbah23/groq-sdk'

const client = new GroqSDK({
  apikey: process.env.GROQ_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create — returns the created CreateChatCompletion ENTITY (.data() for the record)
const created = await client.CreateChatCompletion().create({
  choices: [],
  created: 1,
  id: 'example_id',
  messages: [],
  model: 'example_model',
  object: 'example_object',
  usage: {},
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const models = await client.Model().list()
  console.log(models.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = GroqSDK.test()

const models = await client.Model().list()
// models is an array of Model entities, one per mock record
console.log(models.map((model) => model.data()))
```

You can also use the instance method:

```ts
const client = new GroqSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Model()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new GroqSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### GroqSDK

#### Constructor

```ts
new GroqSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `CreateChatCompletion(data?)` | `CreateChatCompletionEntity` | Create a CreateChatCompletion entity instance. |
| `CreateEmbedding(data?)` | `CreateEmbeddingEntity` | Create a CreateEmbedding entity instance. |
| `CreateTranscriptionResponseJson(data?)` | `CreateTranscriptionResponseJsonEntity` | Create a CreateTranscriptionResponseJson entity instance. |
| `CreateTranslationResponseJson(data?)` | `CreateTranslationResponseJsonEntity` | Create a CreateTranslationResponseJson entity instance. |
| `Model(data?)` | `ModelEntity` | Create a Model entity instance. |
| `tester(testopts?, sdkopts?)` | `GroqSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `GroqSDK.test(testopts?, sdkopts?)` | `GroqSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): GroqSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create.

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

Operations: create.

API path: `/openai/v1/embeddings`

#### CreateTranscriptionResponseJson

| Field | Description |
| --- | --- |
| `text` | The transcribed text. |

Operations: create.

API path: `/openai/v1/audio/transcriptions`

#### CreateTranslationResponseJson

| Field | Description |
| --- | --- |
| `text` |  |

Operations: create.

API path: `/openai/v1/audio/translations`

#### Model

| Field | Description |
| --- | --- |
| `created` | The Unix timestamp (in seconds) when the model was created. |
| `id` | The model identifier, which can be referenced in the API endpoints. |
| `object` | The object type, which is always "model". |
| `owned_by` | The organization that owns the model. |

Operations: list, load, remove.

API path: `/openai/v1/models`



## Entities


### CreateChatCompletion

Create an instance: `const create_chat_completion = client.CreateChatCompletion()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `choices` | `any[]` | A list of chat completion choices. |
| `created` | `number` | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `number` | Number between -2.0 and 2.0. |
| `function_call` | `any` | Deprecated in favor of `tool_choice`. |
| `functions` | `any[]` | Deprecated in favor of `tools`. |
| `id` | `string` | A unique identifier for the chat completion. |
| `logit_bias` | `Record<string, any>` | This is not yet supported by any of our models. |
| `logprobs` | `boolean` | This is not yet supported by any of our models. |
| `max_tokens` | `number` | The maximum number of tokens that can be generated in the chat completion. |
| `messages` | `any[]` | A list of messages comprising the conversation so far. |
| `model` | `string` | The model used for the chat completion. |
| `n` | `number` | How many chat completion choices to generate for each input message. |
| `object` | `string` | The object type, which is always `chat.completion`. |
| `parallel_tool_calls` | `boolean` | Whether to enable parallel function calling during tool use. |
| `presence_penalty` | `number` | Number between -2.0 and 2.0. |
| `response_format` | `Record<string, any>` | An object specifying the format that the model must output. |
| `seed` | `number` | If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result. |
| `stop` | `any` | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `boolean` | If set, partial message deltas will be sent. |
| `system_fingerprint` | `string` | This fingerprint represents the backend configuration that the model runs with. |
| `temperature` | `number` | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `any` | Controls which (if any) tool is called by the model. |
| `tools` | `any[]` | A list of tools the model may call. |
| `top_logprobs` | `number` | This is not yet supported by any of our models. |
| `top_p` | `number` | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `Record<string, any>` | Usage statistics for the completion request. |
| `user` | `string` | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

#### Example: Create

```ts
const create_chat_completion = await client.CreateChatCompletion().create({
  choices: [],
  created: 1,
  id: 'example_id',
  messages: [],
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```


### CreateEmbedding

Create an instance: `const create_embedding = client.CreateEmbedding()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` | The list of embeddings generated by the model. |
| `encoding_format` | `string` | The format to return the embeddings in. |
| `input` | `any` | Input text to embed, encoded as a string or array of tokens. |
| `model` | `string` | The name of the model used to generate the embedding. |
| `object` | `string` | The object type, which is always "list". |
| `usage` | `Record<string, any>` | The usage information for the request. |
| `user` | `string` | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

#### Example: Create

```ts
const create_embedding = await client.CreateEmbedding().create({
  data: [],
  input: 'example_input',
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```


### CreateTranscriptionResponseJson

Create an instance: `const create_transcription_response_json = client.CreateTranscriptionResponseJson()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `text` | `string` | The transcribed text. |

#### Example: Create

```ts
const create_transcription_response_json = await client.CreateTranscriptionResponseJson().create({
  text: 'example_text',
})
```


### CreateTranslationResponseJson

Create an instance: `const create_translation_response_json = client.CreateTranslationResponseJson()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `text` | `string` |  |

#### Example: Create

```ts
const create_translation_response_json = await client.CreateTranslationResponseJson().create({
  text: 'example_text',
})
```


### Model

Create an instance: `const model = client.Model()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created` | `number` | The Unix timestamp (in seconds) when the model was created. |
| `id` | `string` | The model identifier, which can be referenced in the API endpoints. |
| `object` | `string` | The object type, which is always "model". |
| `owned_by` | `string` | The organization that owns the model. |

#### Example: Load

```ts
const model = await client.Model().load({ id: 'model_id' })
```

#### Example: List

```ts
const models = await client.Model().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
groq/
├── src/
│   ├── GroqSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { GroqSDK } from '@faisalismisbah23/groq-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const model = client.Model()
await model.list()

// model.data() now returns the model data from the last `list`
// model.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

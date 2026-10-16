# Groq TypeScript SDK Reference

Complete API reference for the Groq TypeScript SDK.


## GroqSDK

### Constructor

```ts
new GroqSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GroqSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GroqSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GroqSDK` instance in test mode.


### Instance Methods

#### `CreateChatCompletion(data?: object)`

Create a new `CreateChatCompletion` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateChatCompletionEntity` instance.

#### `CreateEmbedding(data?: object)`

Create a new `CreateEmbedding` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateEmbeddingEntity` instance.

#### `CreateTranscriptionResponseJson(data?: object)`

Create a new `CreateTranscriptionResponseJson` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateTranscriptionResponseJsonEntity` instance.

#### `CreateTranslationResponseJson(data?: object)`

Create a new `CreateTranslationResponseJson` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CreateTranslationResponseJsonEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GroqSDK.test()`.

**Returns:** `GroqSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## CreateChatCompletionEntity

```ts
const create_chat_completion = client.CreateChatCompletion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `choices` | `any[]` | Yes | A list of chat completion choices. |
| `created` | `number` | Yes | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `number` | No | Number between -2.0 and 2.0. |
| `function_call` | `any` | No | Deprecated in favor of `tool_choice`. |
| `functions` | `any[]` | No | Deprecated in favor of `tools`. |
| `id` | `string` | Yes | A unique identifier for the chat completion. |
| `logit_bias` | `Record<string, any>` | No | This is not yet supported by any of our models. |
| `logprobs` | `boolean` | No | This is not yet supported by any of our models. |
| `max_tokens` | `number` | No | The maximum number of tokens that can be generated in the chat completion. |
| `messages` | `any[]` | Yes | A list of messages comprising the conversation so far. |
| `model` | `string` | Yes | The model used for the chat completion. |
| `n` | `number` | No | How many chat completion choices to generate for each input message. |
| `object` | `string` | Yes | The object type, which is always `chat.completion`. |
| `parallel_tool_calls` | `boolean` | No | Whether to enable parallel function calling during tool use. |
| `presence_penalty` | `number` | No | Number between -2.0 and 2.0. |
| `response_format` | `Record<string, any>` | No | An object specifying the format that the model must output. |
| `seed` | `number` | No | If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result. |
| `stop` | `any` | No | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `boolean` | No | If set, partial message deltas will be sent. |
| `system_fingerprint` | `string` | No | This fingerprint represents the backend configuration that the model runs with. |
| `temperature` | `number` | No | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `any` | No | Controls which (if any) tool is called by the model. |
| `tools` | `any[]` | No | A list of tools the model may call. |
| `top_logprobs` | `number` | No | This is not yet supported by any of our models. |
| `top_p` | `number` | No | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `Record<string, any>` | Yes | Usage statistics for the completion request. |
| `user` | `string` | No | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateChatCompletion().create({
  choices: [],
  created: 1,
  id: 'example_id',
  messages: [],
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateChatCompletionEntity` instance with the same client and
options.

#### `client()`

Return the parent `GroqSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateEmbeddingEntity

```ts
const create_embedding = client.CreateEmbedding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | The list of embeddings generated by the model. |
| `encoding_format` | `string` | No | The format to return the embeddings in. |
| `input` | `any` | Yes | Input text to embed, encoded as a string or array of tokens. |
| `model` | `string` | Yes | The name of the model used to generate the embedding. |
| `object` | `string` | Yes | The object type, which is always "list". |
| `usage` | `Record<string, any>` | Yes | The usage information for the request. |
| `user` | `string` | No | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateEmbedding().create({
  data: [],
  input: 'example_input',
  model: 'example_model',
  object: 'example_object',
  usage: {},
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateEmbeddingEntity` instance with the same client and
options.

#### `client()`

Return the parent `GroqSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateTranscriptionResponseJsonEntity

```ts
const create_transcription_response_json = client.CreateTranscriptionResponseJson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `string` | Yes | The transcribed text. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateTranscriptionResponseJson().create({
  text: 'example_text',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateTranscriptionResponseJsonEntity` instance with the same client and
options.

#### `client()`

Return the parent `GroqSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CreateTranslationResponseJsonEntity

```ts
const create_translation_response_json = client.CreateTranslationResponseJson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.CreateTranslationResponseJson().create({
  text: 'example_text',
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CreateTranslationResponseJsonEntity` instance with the same client and
options.

#### `client()`

Return the parent `GroqSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `number` | Yes | The Unix timestamp (in seconds) when the model was created. |
| `id` | `string` | Yes | The model identifier, which can be referenced in the API endpoints. |
| `object` | `string` | Yes | The object type, which is always "model". |
| `owned_by` | `string` | Yes | The organization that owns the model. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Model().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Model().load({ id: 'model_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Model().remove({ id: 'model_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `GroqSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new GroqSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.


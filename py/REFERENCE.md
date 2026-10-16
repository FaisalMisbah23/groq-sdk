# Groq Python SDK Reference

Complete API reference for the Groq Python SDK.


## GroqSDK

### Constructor

```python
from groq_sdk import GroqSDK

client = GroqSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GroqSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GroqSDK.test()
```


### Instance Methods

#### `CreateChatCompletion(data=None)`

Create a new `CreateChatCompletionEntity` instance. Pass `None` for no initial data.

#### `CreateEmbedding(data=None)`

Create a new `CreateEmbeddingEntity` instance. Pass `None` for no initial data.

#### `CreateTranscriptionResponseJson(data=None)`

Create a new `CreateTranscriptionResponseJsonEntity` instance. Pass `None` for no initial data.

#### `CreateTranslationResponseJson(data=None)`

Create a new `CreateTranslationResponseJsonEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CreateChatCompletionEntity

```python
create_chat_completion = client.CreateChatCompletion()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `choices` | `list` | Yes | A list of chat completion choices. |
| `created` | `int` | Yes | The Unix timestamp (in seconds) of when the chat completion was created. |
| `frequency_penalty` | `float` | No | Number between -2.0 and 2.0. |
| `function_call` | `Any` | No | Deprecated in favor of `tool_choice`. |
| `functions` | `list` | No | Deprecated in favor of `tools`. |
| `id` | `str` | Yes | A unique identifier for the chat completion. |
| `logit_bias` | `dict` | No | This is not yet supported by any of our models. |
| `logprobs` | `bool` | No | This is not yet supported by any of our models. |
| `max_tokens` | `int` | No | The maximum number of tokens that can be generated in the chat completion. |
| `messages` | `list` | Yes | A list of messages comprising the conversation so far. |
| `model` | `str` | Yes | The model used for the chat completion. |
| `n` | `int` | No | How many chat completion choices to generate for each input message. |
| `object` | `str` | Yes | The object type, which is always `chat.completion`. |
| `parallel_tool_calls` | `bool` | No | Whether to enable parallel function calling during tool use. |
| `presence_penalty` | `float` | No | Number between -2.0 and 2.0. |
| `response_format` | `dict` | No | An object specifying the format that the model must output. |
| `seed` | `int` | No | If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result. |
| `stop` | `Any` | No | Up to 4 sequences where the API will stop generating further tokens. |
| `stream` | `bool` | No | If set, partial message deltas will be sent. |
| `system_fingerprint` | `str` | No | This fingerprint represents the backend configuration that the model runs with. |
| `temperature` | `float` | No | What sampling temperature to use, between 0 and 2. |
| `tool_choice` | `Any` | No | Controls which (if any) tool is called by the model. |
| `tools` | `list` | No | A list of tools the model may call. |
| `top_logprobs` | `int` | No | This is not yet supported by any of our models. |
| `top_p` | `float` | No | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. |
| `usage` | `dict` | Yes | Usage statistics for the completion request. |
| `user` | `str` | No | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

### Operations

#### `create(reqdata, ctrl=None) -> CreateChatCompletionEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateChatCompletion().create({
    "choices": [],  # list
    "created": 1,  # int
    "id": "example_id",  # str
    "messages": [],  # list
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateChatCompletionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateEmbeddingEntity

```python
create_embedding = client.CreateEmbedding()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes | The list of embeddings generated by the model. |
| `encoding_format` | `str` | No | The format to return the embeddings in. |
| `input` | `Any` | Yes | Input text to embed, encoded as a string or array of tokens. |
| `model` | `str` | Yes | The name of the model used to generate the embedding. |
| `object` | `str` | Yes | The object type, which is always "list". |
| `usage` | `dict` | Yes | The usage information for the request. |
| `user` | `str` | No | A unique identifier representing your end-user, which can help us monitor and detect abuse. |

### Operations

#### `create(reqdata, ctrl=None) -> CreateEmbeddingEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateEmbedding().create({
    "data": [],  # list
    "input": "example_input",  # Any
    "model": "example_model",  # str
    "object": "example_object",  # str
    "usage": {},  # dict
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateEmbeddingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateTranscriptionResponseJsonEntity

```python
create_transcription_response_json = client.CreateTranscriptionResponseJson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `str` | Yes | The transcribed text. |

### Operations

#### `create(reqdata, ctrl=None) -> CreateTranscriptionResponseJsonEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateTranscriptionResponseJson().create({
    "text": "example_text",  # str
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateTranscriptionResponseJsonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CreateTranslationResponseJsonEntity

```python
create_translation_response_json = client.CreateTranslationResponseJson()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> CreateTranslationResponseJsonEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.CreateTranslationResponseJson().create({
    "text": "example_text",  # str
})
```

Declares a `multipart/form-data` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CreateTranslationResponseJsonEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created` | `int` | Yes | The Unix timestamp (in seconds) when the model was created. |
| `id` | `str` | Yes | The model identifier, which can be referenced in the API endpoints. |
| `object` | `str` | Yes | The object type, which is always "model". |
| `owned_by` | `str` | Yes | The organization that owns the model. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ModelEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Model().list()
for model in results:
    print(model.data_get())
```

#### `load(reqmatch, ctrl=None) -> ModelEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Model().load({"id": "model_id"})
```

#### `remove(reqmatch, ctrl=None) -> ModelEntity`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```python
result = client.Model().remove({"id": "model_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = GroqSDK({
    "feature": {
        "test": {"active": True},
    },
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


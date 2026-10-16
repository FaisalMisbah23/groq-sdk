"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CreateChatCompletionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GROQ_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GROQ_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GroqSDK.test();
        const ent = testsdk.CreateChatCompletion();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GroqSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CreateChatCompletion().create({ "choices": "x", "created": "x", "id": "x", "messages": "x", "model": "x", "object": "x", "usage": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GROQ_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'create_chat_completion.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "choices": { "a": true, "h": "Choices", "n": "choices", "r": true, "sh": "A list of chat completion choices.", "t": "`$ARRAY`", "key$": "choices", "index$": 0 }, "created": { "a": true, "h": "Created", "n": "created", "r": true, "sh": "The Unix timestamp (in seconds) of when the chat completion was created.", "t": "`$INTEGER`", "key$": "created", "index$": 1 }, "frequency_penalty": { "a": true, "h": "Frequency Penalty", "n": "frequency_penalty", "r": false, "sh": "Number between -2.0 and 2.0.", "t": "`$NUMBER`", "key$": "frequency_penalty", "index$": 2 }, "function_call": { "a": true, "de": true, "h": "Function Call", "n": "function_call", "r": false, "sh": "Deprecated in favor of `tool_choice`.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "function_call", "index$": 3 }, "functions": { "a": true, "de": true, "h": "Functions", "n": "functions", "r": false, "sh": "Deprecated in favor of `tools`.", "t": "`$ARRAY`", "key$": "functions", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "A unique identifier for the chat completion.", "t": "`$STRING`", "key$": "id", "index$": 5 }, "logit_bias": { "a": true, "h": "Logit Bias", "n": "logit_bias", "r": false, "sh": "This is not yet supported by any of our models.", "t": "`$OBJECT`", "key$": "logit_bias", "index$": 6 }, "logprobs": { "a": true, "h": "Logprobs", "n": "logprobs", "r": false, "sh": "This is not yet supported by any of our models.", "t": "`$BOOLEAN`", "key$": "logprobs", "index$": 7 }, "max_tokens": { "a": true, "h": "Max Tokens", "n": "max_tokens", "r": false, "sh": "The maximum number of tokens that can be generated in the chat completion.", "t": "`$INTEGER`", "key$": "max_tokens", "index$": 8 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": true, "sh": "A list of messages comprising the conversation so far.", "t": "`$ARRAY`", "union": { "branches": 2, "count": 2, "depth": 8 }, "key$": "messages", "index$": 9 }, "model": { "a": true, "h": "Model", "n": "model", "r": true, "sh": "The model used for the chat completion.", "t": "`$STRING`", "key$": "model", "index$": 10 }, "n": { "a": true, "h": "N", "n": "n", "r": false, "sh": "How many chat completion choices to generate for each input message.", "t": "`$INTEGER`", "key$": "n", "index$": 11 }, "object": { "a": true, "h": "Object", "n": "object", "r": true, "sh": "The object type, which is always `chat.completion`.", "t": "`$STRING`", "key$": "object", "index$": 12 }, "parallel_tool_calls": { "a": true, "h": "Parallel Tool Calls", "n": "parallel_tool_calls", "r": false, "sh": "Whether to enable parallel function calling during tool use.", "t": "`$BOOLEAN`", "key$": "parallel_tool_calls", "index$": 13 }, "presence_penalty": { "a": true, "h": "Presence Penalty", "n": "presence_penalty", "r": false, "sh": "Number between -2.0 and 2.0.", "t": "`$NUMBER`", "key$": "presence_penalty", "index$": 14 }, "response_format": { "a": true, "h": "Response Format", "n": "response_format", "r": false, "sh": "An object specifying the format that the model must output.", "t": "`$OBJECT`", "key$": "response_format", "index$": 15 }, "seed": { "a": true, "h": "Seed", "n": "seed", "r": false, "sh": "If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result.", "t": "`$INTEGER`", "key$": "seed", "index$": 16 }, "stop": { "a": true, "h": "Stop", "n": "stop", "r": false, "sh": "Up to 4 sequences where the API will stop generating further tokens.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "stop", "index$": 17 }, "stream": { "a": true, "h": "Stream", "n": "stream", "r": false, "sh": "If set, partial message deltas will be sent.", "t": "`$BOOLEAN`", "key$": "stream", "index$": 18 }, "system_fingerprint": { "a": true, "h": "System Fingerprint", "n": "system_fingerprint", "r": false, "sh": "This fingerprint represents the backend configuration that the model runs with.", "t": "`$STRING`", "key$": "system_fingerprint", "index$": 19 }, "temperature": { "a": true, "h": "Temperature", "n": "temperature", "r": false, "sh": "What sampling temperature to use, between 0 and 2.", "t": "`$NUMBER`", "key$": "temperature", "index$": 20 }, "tool_choice": { "a": true, "h": "Tool Choice", "n": "tool_choice", "r": false, "sh": "Controls which (if any) tool is called by the model.", "t": "`$ANY`", "union": { "branches": 2, "count": 1, "depth": 0 }, "key$": "tool_choice", "index$": 21 }, "tools": { "a": true, "h": "Tools", "n": "tools", "r": false, "sh": "A list of tools the model may call.", "t": "`$ARRAY`", "key$": "tools", "index$": 22 }, "top_logprobs": { "a": true, "h": "Top Logprobs", "n": "top_logprobs", "r": false, "sh": "This is not yet supported by any of our models.", "t": "`$INTEGER`", "key$": "top_logprobs", "index$": 23 }, "top_p": { "a": true, "h": "Top P", "n": "top_p", "r": false, "sh": "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.", "t": "`$NUMBER`", "key$": "top_p", "index$": 24 }, "usage": { "a": true, "h": "Usage", "n": "usage", "r": true, "sh": "Usage statistics for the completion request.", "t": "`$OBJECT`", "key$": "usage", "index$": 25 }, "user": { "a": true, "h": "User", "n": "user", "r": false, "sh": "A unique identifier representing your end-user, which can help us monitor and detect abuse.", "t": "`$STRING`", "key$": "user", "index$": 26 } }, "id": { "field": "id", "name": "id" }, "name": "create_chat_completion", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["frequency_penalty", "function_call", "functions", "logit_bias", "logprobs", "max_tokens", "messages", "model", "n", "parallel_tool_calls", "presence_penalty", "response_format", "seed", "stop", "stream", "temperature", "tool_choice", "tools", "top_logprobs", "top_p", "user"], "co": { "id": "POST /openai/v1/chat/completions", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/openai/v1/chat/completions", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "openai" }, { "lit": "v1" }, { "lit": "chat" }, { "lit": "completions" }], "t": { "req": { "frequency_penalty": "`reqdata.frequency_penalty`", "function_call": "`reqdata.function_call`", "functions": "`reqdata.functions`", "logit_bias": "`reqdata.logit_bias`", "logprobs": "`reqdata.logprobs`", "max_tokens": "`reqdata.max_tokens`", "messages": "`reqdata.messages`", "model": "`reqdata.model`", "n": "`reqdata.n`", "parallel_tool_calls": "`reqdata.parallel_tool_calls`", "presence_penalty": "`reqdata.presence_penalty`", "response_format": "`reqdata.response_format`", "seed": "`reqdata.seed`", "stop": "`reqdata.stop`", "stream": "`reqdata.stream`", "temperature": "`reqdata.temperature`", "tool_choice": "`reqdata.tool_choice`", "tools": "`reqdata.tools`", "top_logprobs": "`reqdata.top_logprobs`", "top_p": "`reqdata.top_p`", "user": "`reqdata.user`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "create_chat_completion", "name__orig": "create_chat_completion", "Name": "CreateChatCompletion", "name_": "create_chat_completion", "name-": "create-chat-completion", "NAME": "CREATE_CHAT_COMPLETION", "index$": 0 }, { "active": true, "entity": "create_chat_completion", "key$": "BasicCreateChatCompletionFlow", "kind": "basic", "name": "BasicCreateChatCompletionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "create_chat_completion_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CreateChatCompletion', { "POST /openai/v1/chat/completions": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "additionalProperties": false, "properties": { "frequency_penalty": { "default": 0, "description": "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.", "maximum": 2, "minimum": -2, "nullable": true, "type": "number", "key$": "frequency_penalty" }, "function_call": { "deprecated": true, "description": "Deprecated in favor of `tool_choice`.\n\nControls which (if any) function is called by the model.\n`none` means the model will not call a function and instead generates a message.\n`auto` means the model can pick between generating a message or calling a function.\nSpecifying a particular function via `{\"name\": \"my_function\"}` forces the model to call that function.\n\n`none` is the default when no functions are present. `auto` is the default if functions are present.\n", "nullable": true, "oneOf": [{ "description": "`none` means the model will not call a function and instead generates a message. `auto` means the model can pick between generating a message or calling a function.\n", "enum": ["none", "auto", "required"], "type": "string" }, { "description": "Specifying a particular function via `{\"name\": \"my_function\"}` forces the model to call that function.\n", "properties": { "name": {} }, "required": ["name"], "type": "object", "x-ref": "#/components/schemas/ChatCompletionFunctionCallOption" }], "key$": "function_call" }, "functions": { "deprecated": true, "description": "Deprecated in favor of `tools`.\n\nA list of functions the model may generate JSON inputs for.\n", "items": { "deprecated": true, "properties": { "description": { "description": "A description of what the function does, used by the model to choose when and how to call the function.", "type": "string" }, "name": { "description": "The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.", "type": "string" }, "parameters": { "additionalProperties": true, "description": "The parameters the functions accepts, described as a JSON Schema object. See the docs on [tool use](/docs/tool-use) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format. \n\nOmitting `parameters` defines a function with an empty parameter list.", "type": "object", "x-ref": "#/components/schemas/FunctionParameters" } }, "required": ["name"], "type": "object", "x-ref": "#/components/schemas/ChatCompletionFunctions" }, "maxItems": 128, "minItems": 0, "nullable": true, "type": "array", "key$": "functions" }, "logit_bias": { "additionalProperties": { "type": "integer" }, "default": null, "description": "This is not yet supported by any of our models.\nModify the likelihood of specified tokens appearing in the completion.\n", "nullable": true, "type": "object", "key$": "logit_bias" }, "logprobs": { "default": false, "description": "This is not yet supported by any of our models.\nWhether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the `content` of `message`.\n", "nullable": true, "type": "boolean", "key$": "logprobs" }, "max_tokens": { "description": "The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.\n", "nullable": true, "type": "integer", "key$": "max_tokens" }, "messages": { "description": "A list of messages comprising the conversation so far.", "items": { "discriminator": { "mapping": { "assistant": "#/components/schemas/ChatCompletionRequestAssistantMessage", "function": "#/components/schemas/ChatCompletionRequestFunctionMessage", "system": "#/components/schemas/ChatCompletionRequestSystemMessage", "tool": "#/components/schemas/ChatCompletionRequestToolMessage", "user": "#/components/schemas/ChatCompletionRequestUserMessage" }, "propertyName": "role" }, "oneOf": [{ "additionalProperties": false, "properties": {}, "required": [], "title": "System message", "type": "object", "x-ref": "#/components/schemas/ChatCompletionRequestSystemMessage" }, { "additionalProperties": false, "properties": {}, "required": [], "title": "User message", "type": "object", "x-ref": "#/components/schemas/ChatCompletionRequestUserMessage" }, { "additionalProperties": false, "properties": {}, "required": [], "title": "Assistant message", "type": "object", "x-ref": "#/components/schemas/ChatCompletionRequestAssistantMessage" }, { "additionalProperties": false, "properties": {}, "required": [], "title": "Tool message", "type": "object", "x-ref": "#/components/schemas/ChatCompletionRequestToolMessage" }, { "additionalProperties": false, "deprecated": true, "properties": {}, "required": [], "title": "Function message", "type": "object", "x-ref": "#/components/schemas/ChatCompletionRequestFunctionMessage" }], "x-ref": "#/components/schemas/ChatCompletionRequestMessage" }, "minItems": 1, "type": "array", "key$": "messages" }, "model": { "anyOf": [{ "type": "string" }, { "enum": ["gemma-7b-it", "llama3-70b-8192", "llama3-8b-8192", "mixtral-8x7b-32768"], "type": "string" }], "description": "ID of the model to use. For details on which models are compatible with the Chat API, see available [models](/docs/models)", "key$": "model" }, "n": { "default": 1, "description": "How many chat completion choices to generate for each input message. Note that the current moment, only n=1 is supported. Other values will result in a 400 response.", "example": 1, "maximum": 1, "minimum": 1, "nullable": true, "type": "integer", "key$": "n" }, "parallel_tool_calls": { "default": true, "description": "Whether to enable parallel function calling during tool use.\n", "nullable": true, "type": "boolean", "key$": "parallel_tool_calls" }, "presence_penalty": { "default": 0, "description": "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.", "maximum": 2, "minimum": -2, "nullable": true, "type": "number", "key$": "presence_penalty" }, "response_format": { "description": "An object specifying the format that the model must output. \n\nSetting to `{ \"type\": \"json_object\" }` enables JSON mode, which guarantees the message the model generates is valid JSON.\n\n**Important:** when using JSON mode, you **must** also instruct the model to produce JSON yourself via a system or user message.\n", "nullable": true, "properties": { "type": { "default": "text", "description": "Must be one of `text` or `json_object`.", "enum": ["text", "json_object"], "example": "json_object", "type": "string" } }, "type": "object", "key$": "response_format" }, "seed": { "description": "If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result.\nDeterminism is not guaranteed, and you should refer to the `system_fingerprint` response parameter to monitor changes in the backend.\n", "nullable": true, "type": "integer", "key$": "seed" }, "stop": { "default": null, "description": "Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.\n", "nullable": true, "oneOf": [{ "example": "\nnullable: true\ntype: string\n" }, { "items": { "example": "[\"\\n\"]", "type": "string" }, "maxItems": 4, "minItems": 0, "type": "array" }], "key$": "stop" }, "stream": { "default": false, "description": "If set, partial message deltas will be sent. Tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message. [Example code](/docs/text-chat#streaming-a-chat-completion).\n", "nullable": true, "type": "boolean", "key$": "stream" }, "temperature": { "default": 1, "description": "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both", "example": 1, "maximum": 2, "minimum": 0, "nullable": true, "type": "number", "key$": "temperature" }, "tool_choice": { "description": "Controls which (if any) tool is called by the model.\n`none` means the model will not call any tool and instead generates a message.\n`auto` means the model can pick between generating a message or calling one or more tools.\n`required` means the model must call one or more tools.\nSpecifying a particular tool via `{\"type\": \"function\", \"function\": {\"name\": \"my_function\"}}` forces the model to call that tool.\n\n`none` is the default when no tools are present. `auto` is the default if tools are present.\n", "nullable": true, "oneOf": [{ "description": "`none` means the model will not call any tool and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools.\n", "enum": ["none", "auto", "required"], "type": "string" }, { "description": "Specifies a tool the model should use. Use to force the model to call a specific function.", "properties": { "function": {}, "type": {} }, "required": ["type", "function"], "type": "object", "x-ref": "#/components/schemas/ChatCompletionNamedToolChoice" }], "x-groq-meta": { "validator": "ChatCompletionToolChoiceOption" }, "x-ref": "#/components/schemas/ChatCompletionToolChoiceOption", "key$": "tool_choice" }, "tools": { "description": "A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.\n", "items": { "properties": { "function": { "properties": {}, "required": [], "type": "object", "x-ref": "#/components/schemas/FunctionObject" }, "type": { "description": "The type of the tool. Currently, only `function` is supported.", "enum": [], "type": "string" } }, "required": ["type", "function"], "type": "object", "x-ref": "#/components/schemas/ChatCompletionTool" }, "maxItems": 128, "nullable": true, "type": "array", "key$": "tools" }, "top_logprobs": { "description": "This is not yet supported by any of our models.\nAn integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. `logprobs` must be set to `true` if this parameter is used.\n", "maximum": 20, "minimum": 0, "nullable": true, "type": "integer", "key$": "top_logprobs" }, "top_p": { "default": 1, "description": "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.", "example": 1, "maximum": 1, "minimum": 0, "nullable": true, "type": "number", "key$": "top_p" }, "user": { "description": "A unique identifier representing your end-user, which can help us monitor and detect abuse.", "nullable": true, "type": "string", "key$": "user" } }, "required": ["model", "messages"], "type": "object", "x-ref": "#/components/schemas/CreateChatCompletionRequest", "index$": 1 } } }, "description": "The chat prompt and parameters", "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const create_chat_completion_ref01_ent = client.CreateChatCompletion();
        let create_chat_completion_ref01_data = setup.data.new.create_chat_completion['create_chat_completion_ref01'];
        create_chat_completion_ref01_data = (await create_chat_completion_ref01_ent.create(create_chat_completion_ref01_data)).data();
        (0, node_assert_1.default)(null != create_chat_completion_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/create_chat_completion/CreateChatCompletionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GroqSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['create_chat_completion01', 'create_chat_completion02', 'create_chat_completion03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GROQ_TEST_CREATE_CHAT_COMPLETION_ENTID': idmap,
        'GROQ_TEST_LIVE': 'FALSE',
        'GROQ_TEST_EXPLAIN': 'FALSE',
        'GROQ_APIKEY': '',
    });
    idmap = env['GROQ_TEST_CREATE_CHAT_COMPLETION_ENTID'];
    const live = 'TRUE' === env.GROQ_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GROQ_TEST_CREATE_CHAT_COMPLETION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GroqSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.GROQ_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GROQ_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CreateChatCompletionEntity.test.js.map
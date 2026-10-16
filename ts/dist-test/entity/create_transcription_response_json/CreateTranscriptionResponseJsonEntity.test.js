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
(0, node_test_1.describe)('CreateTranscriptionResponseJsonEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GROQ_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GROQ_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GroqSDK.test();
        const ent = testsdk.CreateTranscriptionResponseJson();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.GroqSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CreateTranscriptionResponseJson().create({ "text": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GROQ_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'create_transcription_response_json.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "text": { "a": true, "h": "Text", "n": "text", "r": true, "sh": "The transcribed text.", "t": "`$STRING`", "key$": "text", "index$": 0 } }, "name": "create_transcription_response_json", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /openai/v1/audio/transcriptions", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/openai/v1/audio/transcriptions", "q": {}, "r": {}, "rb": { "fields": [{ "binary": true, "name": "file" }, { "name": "language" }, { "name": "model" }, { "name": "prompt" }, { "name": "response_format" }, { "name": "temperature" }, { "list": true, "name": "timestamp_granularities" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "openai" }, { "lit": "v1" }, { "lit": "audio" }, { "lit": "transcriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "create_transcription_response_json", "name__orig": "create_transcription_response_json", "Name": "CreateTranscriptionResponseJson", "name_": "create_transcription_response_json", "name-": "create-transcription-response-json", "NAME": "CREATE_TRANSCRIPTION_RESPONSE_JSON", "index$": 2 }, { "active": true, "entity": "create_transcription_response_json", "key$": "BasicCreateTranscriptionResponseJsonFlow", "kind": "basic", "name": "BasicCreateTranscriptionResponseJsonFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "create_transcription_response_json_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CreateTranscriptionResponseJson', { "POST /openai/v1/audio/transcriptions": { "protocol": "http", "requestBody": { "content": { "multipart/form-data": { "schema": { "additionalProperties": false, "properties": { "file": { "description": "The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, or webm.\n", "format": "binary", "type": "string" }, "language": { "anyOf": [{ "type": "string" }, { "enum": ["en", "zh", "de", "es", "ru", "ko", "fr", "ja", "pt", "tr", "pl", "ca", "nl", "ar", "sv", "it", "id", "hi", "fi", "vi", "he", "uk", "el", "ms", "cs", "ro", "da", "hu", "ta", false, "th", "ur", "hr", "bg", "lt", "la", "mi", "ml", "cy", "sk", "te", "fa", "lv", "bn", "sr", "az", "sl", "kn", "et", "mk", "br", "eu", "is", "hy", "ne", "mn", "bs", "kk", "sq", "sw", "gl", "mr", "pa", "si", "km", "sn", "yo", "so", "af", "oc", "ka", "be", "tg", "sd", "gu", "am", "yi", "lo", "uz", "fo", "ht", "ps", "tk", "nn", "mt", "sa", "lb", "my", "bo", "tl", "mg", "as", "tt", "haw", "ln", "ha", "ba", "jv", "su", "yue"], "type": "string" }], "description": "The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.\n" }, "model": { "anyOf": [{ "type": "string" }, { "enum": ["whisper-large-v3"], "type": "string" }], "description": "ID of the model to use. Only `whisper-large-v3` is currently available.\n", "example": "whisper-large-v3" }, "prompt": { "description": "An optional text to guide the model's style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.\n", "type": "string" }, "response_format": { "default": "json", "description": "The format of the transcript output, in one of these options: `json`, `text`, or `verbose_json`.\n", "enum": ["json", "text", "verbose_json"], "type": "string" }, "temperature": { "default": 0, "description": "The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.\n", "type": "number" }, "timestamp_granularities": { "default": ["segment"], "description": "The timestamp granularities to populate for this transcription. `response_format` must be set `verbose_json` to use timestamp granularities. Either or both of these options are supported: `word`, or `segment`. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency.\n", "items": { "enum": ["word", "segment"], "type": "string" }, "type": "array" } }, "required": ["file", "model"], "type": "object", "x-ref": "#/components/schemas/CreateTranscriptionRequest" } } }, "required": true }, "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const create_transcription_response_json_ref01_ent = client.CreateTranscriptionResponseJson();
        let create_transcription_response_json_ref01_data = setup.data.new.create_transcription_response_json['create_transcription_response_json_ref01'];
        create_transcription_response_json_ref01_data = (await create_transcription_response_json_ref01_ent.create(create_transcription_response_json_ref01_data)).data();
        (0, node_assert_1.default)(null != create_transcription_response_json_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/create_transcription_response_json/CreateTranscriptionResponseJsonTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GroqSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['create_transcription_response_json01', 'create_transcription_response_json02', 'create_transcription_response_json03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GROQ_TEST_CREATE_TRANSCRIPTION_RESPONSE_JSON_ENTID': idmap,
        'GROQ_TEST_LIVE': 'FALSE',
        'GROQ_TEST_EXPLAIN': 'FALSE',
        'GROQ_APIKEY': '',
    });
    idmap = env['GROQ_TEST_CREATE_TRANSCRIPTION_RESPONSE_JSON_ENTID'];
    const live = 'TRUE' === env.GROQ_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GROQ_TEST_CREATE_TRANSCRIPTION_RESPONSE_JSON_ENTID'];
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
//# sourceMappingURL=CreateTranscriptionResponseJsonEntity.test.js.map
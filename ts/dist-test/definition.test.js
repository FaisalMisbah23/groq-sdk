"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "create_chat_completion",
        "accessor": "CreateChatCompletion",
        "op": "create",
        "method": "POST",
        "path": "/openai/v1/chat/completions",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "choices": [
                {
                    "finish_reason": "stop",
                    "index": 1,
                    "logprobs": {
                        "content": [
                            {
                                "bytes": [],
                                "logprob": 1,
                                "token": "x",
                                "top_logprobs": []
                            }
                        ]
                    },
                    "message": {
                        "content": "x",
                        "function_call": {
                            "arguments": "x",
                            "name": "x"
                        },
                        "role": "assistant",
                        "tool_calls": [
                            {
                                "function": {},
                                "id": "x",
                                "type": "function"
                            }
                        ]
                    }
                }
            ],
            "created": 1,
            "id": "x",
            "model": "x",
            "object": "chat.completion",
            "system_fingerprint": "x",
            "usage": {
                "completion_time": 1,
                "completion_tokens": 1,
                "prompt_time": 1,
                "prompt_tokens": 1,
                "queue_time": 1,
                "total_time": 1,
                "total_tokens": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "create_embedding",
        "accessor": "CreateEmbedding",
        "op": "create",
        "method": "POST",
        "path": "/openai/v1/embeddings",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "embedding": [
                        1
                    ],
                    "index": 1,
                    "object": "embedding"
                }
            ],
            "model": "x",
            "object": "list",
            "usage": {
                "prompt_tokens": 1,
                "total_tokens": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "create_transcription_response_json",
        "accessor": "CreateTranscriptionResponseJson",
        "op": "create",
        "method": "POST",
        "path": "/openai/v1/audio/transcriptions",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "text": "x"
        },
        "idField": "id"
    },
    {
        "entity": "create_translation_response_json",
        "accessor": "CreateTranslationResponseJson",
        "op": "create",
        "method": "POST",
        "path": "/openai/v1/audio/translations",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json",
            "text/plain"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "text": "x"
        },
        "idField": "id"
    },
    {
        "entity": "model",
        "accessor": "Model",
        "op": "list",
        "method": "GET",
        "path": "/openai/v1/models",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "data": [
                {
                    "created": 1,
                    "id": "x",
                    "object": "model",
                    "owned_by": "x"
                }
            ],
            "object": "list"
        },
        "idField": "id"
    },
    {
        "entity": "model",
        "accessor": "Model",
        "op": "load",
        "method": "GET",
        "path": "/openai/v1/models/{model}",
        "args": [
            {
                "name": "id",
                "wire": "model",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created": 1,
            "id": "x",
            "object": "model",
            "owned_by": "x"
        },
        "idField": "id"
    },
    {
        "entity": "model",
        "accessor": "Model",
        "op": "remove",
        "method": "DELETE",
        "path": "/openai/v1/models/{model}",
        "args": [
            {
                "name": "id",
                "wire": "model",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "deleted": true,
            "id": "x",
            "object": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map
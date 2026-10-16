
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Groq',
        slug: "groq",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.groq.com",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        create_chat_completion: {
        },
  
        create_embedding: {
        },
  
        create_transcription_response_json: {
        },
  
        create_translation_response_json: {
        },
  
        model: {
        },
  
    }
  }


  entity = {
    "create_chat_completion": {
      "fields": [
        {
          "name": "choices",
          "title": "Choices",
          "type": "`$ARRAY`",
          "req": true,
          "short": "A list of chat completion choices."
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$INTEGER`",
          "req": true,
          "short": "The Unix timestamp (in seconds) of when the chat completion was created."
        },
        {
          "name": "frequency_penalty",
          "title": "Frequency Penalty",
          "type": "`$NUMBER`",
          "short": "Number between -2.0 and 2.0."
        },
        {
          "name": "function_call",
          "title": "Function Call",
          "type": "`$ANY`",
          "short": "Deprecated in favor of `tool_choice`.",
          "deprecated": true
        },
        {
          "name": "functions",
          "title": "Functions",
          "type": "`$ARRAY`",
          "short": "Deprecated in favor of `tools`.",
          "deprecated": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "A unique identifier for the chat completion."
        },
        {
          "name": "logit_bias",
          "title": "Logit Bias",
          "type": "`$OBJECT`",
          "short": "This is not yet supported by any of our models."
        },
        {
          "name": "logprobs",
          "title": "Logprobs",
          "type": "`$BOOLEAN`",
          "short": "This is not yet supported by any of our models."
        },
        {
          "name": "max_tokens",
          "title": "Max Tokens",
          "type": "`$INTEGER`",
          "short": "The maximum number of tokens that can be generated in the chat completion."
        },
        {
          "name": "messages",
          "title": "Messages",
          "type": "`$ARRAY`",
          "req": true,
          "short": "A list of messages comprising the conversation so far."
        },
        {
          "name": "model",
          "title": "Model",
          "type": "`$STRING`",
          "req": true,
          "short": "The model used for the chat completion."
        },
        {
          "name": "n",
          "title": "N",
          "type": "`$INTEGER`",
          "short": "How many chat completion choices to generate for each input message."
        },
        {
          "name": "object",
          "title": "Object",
          "type": "`$STRING`",
          "req": true,
          "short": "The object type, which is always `chat.completion`."
        },
        {
          "name": "parallel_tool_calls",
          "title": "Parallel Tool Calls",
          "type": "`$BOOLEAN`",
          "short": "Whether to enable parallel function calling during tool use."
        },
        {
          "name": "presence_penalty",
          "title": "Presence Penalty",
          "type": "`$NUMBER`",
          "short": "Number between -2.0 and 2.0."
        },
        {
          "name": "response_format",
          "title": "Response Format",
          "type": "`$OBJECT`",
          "short": "An object specifying the format that the model must output."
        },
        {
          "name": "seed",
          "title": "Seed",
          "type": "`$INTEGER`",
          "short": "If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result."
        },
        {
          "name": "stop",
          "title": "Stop",
          "type": "`$ANY`",
          "short": "Up to 4 sequences where the API will stop generating further tokens."
        },
        {
          "name": "stream",
          "title": "Stream",
          "type": "`$BOOLEAN`",
          "short": "If set, partial message deltas will be sent."
        },
        {
          "name": "system_fingerprint",
          "title": "System Fingerprint",
          "type": "`$STRING`",
          "short": "This fingerprint represents the backend configuration that the model runs with."
        },
        {
          "name": "temperature",
          "title": "Temperature",
          "type": "`$NUMBER`",
          "short": "What sampling temperature to use, between 0 and 2."
        },
        {
          "name": "tool_choice",
          "title": "Tool Choice",
          "type": "`$ANY`",
          "short": "Controls which (if any) tool is called by the model."
        },
        {
          "name": "tools",
          "title": "Tools",
          "type": "`$ARRAY`",
          "short": "A list of tools the model may call."
        },
        {
          "name": "top_logprobs",
          "title": "Top Logprobs",
          "type": "`$INTEGER`",
          "short": "This is not yet supported by any of our models."
        },
        {
          "name": "top_p",
          "title": "Top P",
          "type": "`$NUMBER`",
          "short": "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Usage statistics for the completion request."
        },
        {
          "name": "user",
          "title": "User",
          "type": "`$STRING`",
          "short": "A unique identifier representing your end-user, which can help us monitor and detect abuse."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "create_chat_completion",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/openai/v1/chat/completions",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "chat"
                },
                {
                  "lit": "completions"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "chat",
                "completions"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "frequency_penalty": "`reqdata.frequency_penalty`",
                  "function_call": "`reqdata.function_call`",
                  "functions": "`reqdata.functions`",
                  "logit_bias": "`reqdata.logit_bias`",
                  "logprobs": "`reqdata.logprobs`",
                  "max_tokens": "`reqdata.max_tokens`",
                  "messages": "`reqdata.messages`",
                  "model": "`reqdata.model`",
                  "n": "`reqdata.n`",
                  "parallel_tool_calls": "`reqdata.parallel_tool_calls`",
                  "presence_penalty": "`reqdata.presence_penalty`",
                  "response_format": "`reqdata.response_format`",
                  "seed": "`reqdata.seed`",
                  "stop": "`reqdata.stop`",
                  "stream": "`reqdata.stream`",
                  "temperature": "`reqdata.temperature`",
                  "tool_choice": "`reqdata.tool_choice`",
                  "tools": "`reqdata.tools`",
                  "top_logprobs": "`reqdata.top_logprobs`",
                  "top_p": "`reqdata.top_p`",
                  "user": "`reqdata.user`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "create_embedding": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "req": true,
          "short": "The list of embeddings generated by the model."
        },
        {
          "name": "encoding_format",
          "title": "Encoding Format",
          "type": "`$STRING`",
          "short": "The format to return the embeddings in."
        },
        {
          "name": "input",
          "title": "Input",
          "type": "`$ANY`",
          "req": true,
          "short": "Input text to embed, encoded as a string or array of tokens."
        },
        {
          "name": "model",
          "title": "Model",
          "type": "`$STRING`",
          "req": true,
          "short": "The name of the model used to generate the embedding."
        },
        {
          "name": "object",
          "title": "Object",
          "type": "`$STRING`",
          "req": true,
          "short": "The object type, which is always \"list\"."
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`",
          "req": true,
          "short": "The usage information for the request."
        },
        {
          "name": "user",
          "title": "User",
          "type": "`$STRING`",
          "short": "A unique identifier representing your end-user, which can help us monitor and detect abuse."
        }
      ],
      "name": "create_embedding",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/openai/v1/embeddings",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "embeddings"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "embeddings"
              ],
              "rename": {},
              "transform": {
                "req": {
                  "encoding_format": "`reqdata.encoding_format`",
                  "input": "`reqdata.input`",
                  "model": "`reqdata.model`",
                  "user": "`reqdata.user`"
                },
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "create_transcription_response_json": {
      "fields": [
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "req": true,
          "short": "The transcribed text."
        }
      ],
      "name": "create_transcription_response_json",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/openai/v1/audio/transcriptions",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "audio"
                },
                {
                  "lit": "transcriptions"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "audio",
                "transcriptions"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "body": {
                "fields": [
                  {
                    "binary": true,
                    "name": "file"
                  },
                  {
                    "name": "language"
                  },
                  {
                    "name": "model"
                  },
                  {
                    "name": "prompt"
                  },
                  {
                    "name": "response_format"
                  },
                  {
                    "name": "temperature"
                  },
                  {
                    "list": true,
                    "name": "timestamp_granularities"
                  }
                ],
                "kind": "multipart",
                "media": "multipart/form-data"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "create_translation_response_json": {
      "fields": [
        {
          "name": "text",
          "title": "Text",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "create_translation_response_json",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/openai/v1/audio/translations",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "audio"
                },
                {
                  "lit": "translations"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "audio",
                "translations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "body": {
                "fields": [
                  {
                    "binary": true,
                    "name": "file"
                  },
                  {
                    "name": "model"
                  },
                  {
                    "name": "prompt"
                  },
                  {
                    "name": "response_format"
                  },
                  {
                    "name": "temperature"
                  }
                ],
                "kind": "multipart",
                "media": "multipart/form-data"
              },
              "response": {
                "alternatives": [
                  {
                    "kind": "raw",
                    "media": "text/plain"
                  }
                ],
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "model": {
      "fields": [
        {
          "name": "created",
          "title": "Created",
          "type": "`$INTEGER`",
          "req": true,
          "short": "The Unix timestamp (in seconds) when the model was created."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The model identifier, which can be referenced in the API endpoints."
        },
        {
          "name": "object",
          "title": "Object",
          "type": "`$STRING`",
          "req": true,
          "short": "The object type, which is always \"model\"."
        },
        {
          "name": "owned_by",
          "title": "Owned By",
          "type": "`$STRING`",
          "req": true,
          "short": "The organization that owns the model."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "model",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/openai/v1/models",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "models"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "models"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/openai/v1/models/{model}",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "models"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "models",
                "{id}"
              ],
              "rename": {
                "param": {
                  "model": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "model",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/openai/v1/models/{model}",
              "segments": [
                {
                  "lit": "openai"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "models"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "openai",
                "v1",
                "models",
                "{id}"
              ],
              "rename": {
                "param": {
                  "model": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "model",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


# Typed models for the Groq SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CreateChatCompletionRequired(TypedDict):
    choices: list
    created: int
    id: str
    messages: list
    model: str
    object: str
    usage: dict


class CreateChatCompletion(CreateChatCompletionRequired, total=False):
    frequency_penalty: float
    function_call: Any
    functions: list
    logit_bias: dict
    logprobs: bool
    max_tokens: int
    n: int
    parallel_tool_calls: bool
    presence_penalty: float
    response_format: dict
    seed: int
    stop: Any
    stream: bool
    system_fingerprint: str
    temperature: float
    tool_choice: Any
    tools: list
    top_logprobs: int
    top_p: float
    user: str


class CreateChatCompletionCreateDataRequired(TypedDict):
    choices: list
    created: int
    id: str
    messages: list
    model: str
    object: str
    usage: dict


class CreateChatCompletionCreateData(CreateChatCompletionCreateDataRequired, total=False):
    frequency_penalty: float
    function_call: Any
    functions: list
    logit_bias: dict
    logprobs: bool
    max_tokens: int
    n: int
    parallel_tool_calls: bool
    presence_penalty: float
    response_format: dict
    seed: int
    stop: Any
    stream: bool
    system_fingerprint: str
    temperature: float
    tool_choice: Any
    tools: list
    top_logprobs: int
    top_p: float
    user: str


class CreateEmbeddingRequired(TypedDict):
    data: list
    input: Any
    model: str
    object: str
    usage: dict


class CreateEmbedding(CreateEmbeddingRequired, total=False):
    encoding_format: str
    user: str


class CreateEmbeddingCreateDataRequired(TypedDict):
    data: list
    input: Any
    model: str
    object: str
    usage: dict


class CreateEmbeddingCreateData(CreateEmbeddingCreateDataRequired, total=False):
    encoding_format: str
    user: str


class CreateTranscriptionResponseJson(TypedDict):
    text: str


class CreateTranscriptionResponseJsonCreateData(TypedDict):
    text: str


class CreateTranslationResponseJson(TypedDict):
    text: str


class CreateTranslationResponseJsonCreateData(TypedDict):
    text: str


class Model(TypedDict):
    created: int
    id: str
    object: str
    owned_by: str


class ModelLoadMatch(TypedDict):
    id: str


class ModelListMatch(TypedDict, total=False):
    created: int
    id: str
    object: str
    owned_by: str


class ModelRemoveMatch(TypedDict):
    id: str

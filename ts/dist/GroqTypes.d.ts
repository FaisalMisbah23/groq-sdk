export interface CreateChatCompletion {
    choices: any[];
    created: number;
    frequency_penalty?: number;
    function_call?: any;
    functions?: any[];
    id: string;
    logit_bias?: Record<string, any>;
    logprobs?: boolean;
    max_tokens?: number;
    messages: any[];
    model: string;
    n?: number;
    object: string;
    parallel_tool_calls?: boolean;
    presence_penalty?: number;
    response_format?: Record<string, any>;
    seed?: number;
    stop?: any;
    stream?: boolean;
    system_fingerprint?: string;
    temperature?: number;
    tool_choice?: any;
    tools?: any[];
    top_logprobs?: number;
    top_p?: number;
    usage: Record<string, any>;
    user?: string;
}
export interface CreateChatCompletionCreateData {
    choices: any[];
    created: number;
    frequency_penalty?: number;
    function_call?: any;
    functions?: any[];
    id: string;
    logit_bias?: Record<string, any>;
    logprobs?: boolean;
    max_tokens?: number;
    messages: any[];
    model: string;
    n?: number;
    object: string;
    parallel_tool_calls?: boolean;
    presence_penalty?: number;
    response_format?: Record<string, any>;
    seed?: number;
    stop?: any;
    stream?: boolean;
    system_fingerprint?: string;
    temperature?: number;
    tool_choice?: any;
    tools?: any[];
    top_logprobs?: number;
    top_p?: number;
    usage: Record<string, any>;
    user?: string;
}
export interface CreateEmbedding {
    data: any[];
    encoding_format?: string;
    input: any;
    model: string;
    object: string;
    usage: Record<string, any>;
    user?: string;
}
export interface CreateEmbeddingCreateData {
    data: any[];
    encoding_format?: string;
    input: any;
    model: string;
    object: string;
    usage: Record<string, any>;
    user?: string;
}
export interface CreateTranscriptionResponseJson {
    text: string;
}
export interface CreateTranscriptionResponseJsonCreateData {
    text: string;
}
export interface CreateTranslationResponseJson {
    text: string;
}
export interface CreateTranslationResponseJsonCreateData {
    text: string;
}
export interface Model {
    created: number;
    id: string;
    object: string;
    owned_by: string;
}
export interface ModelLoadMatch {
    id: string;
}
export interface ModelListMatch {
    created?: number;
    id?: string;
    object?: string;
    owned_by?: string;
}
export interface ModelRemoveMatch {
    id: string;
}

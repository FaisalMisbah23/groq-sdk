import { CreateChatCompletionEntity } from './entity/CreateChatCompletionEntity';
import { CreateEmbeddingEntity } from './entity/CreateEmbeddingEntity';
import { CreateTranscriptionResponseJsonEntity } from './entity/CreateTranscriptionResponseJsonEntity';
import { CreateTranslationResponseJsonEntity } from './entity/CreateTranslationResponseJsonEntity';
import { ModelEntity } from './entity/ModelEntity';
export type * from './GroqTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GroqEntityBase } from './GroqEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class GroqSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CreateChatCompletion(entopts?: Record<string, any>): CreateChatCompletionEntity;
    CreateEmbedding(entopts?: Record<string, any>): CreateEmbeddingEntity;
    CreateTranscriptionResponseJson(entopts?: Record<string, any>): CreateTranscriptionResponseJsonEntity;
    CreateTranslationResponseJson(entopts?: Record<string, any>): CreateTranslationResponseJsonEntity;
    Model(entopts?: Record<string, any>): ModelEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GroqSDK;
    tester(testopts?: any, sdkopts?: any): GroqSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GroqSDK;
export { stdutil, config, BaseFeature, GroqEntityBase, GroqSDK, SDK, };
export type { DirectResult };

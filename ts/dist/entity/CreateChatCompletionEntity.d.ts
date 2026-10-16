import { GroqEntityBase } from '../GroqEntityBase';
import type { GroqSDK } from '../GroqSDK';
import type { Control } from '../types';
import type { CreateChatCompletion, CreateChatCompletionCreateData } from '../GroqTypes';
declare class CreateChatCompletionEntity extends GroqEntityBase<CreateChatCompletion> {
    constructor(client: GroqSDK, entopts: any);
    make(this: CreateChatCompletionEntity): CreateChatCompletionEntity;
    create(this: any, reqdata?: CreateChatCompletionCreateData, ctrl?: Control): Promise<CreateChatCompletionEntity>;
}
export { CreateChatCompletionEntity };

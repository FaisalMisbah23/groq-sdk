import { GroqEntityBase } from '../GroqEntityBase';
import type { GroqSDK } from '../GroqSDK';
import type { Control } from '../types';
import type { CreateTranslationResponseJson, CreateTranslationResponseJsonCreateData } from '../GroqTypes';
declare class CreateTranslationResponseJsonEntity extends GroqEntityBase<CreateTranslationResponseJson> {
    constructor(client: GroqSDK, entopts: any);
    make(this: CreateTranslationResponseJsonEntity): CreateTranslationResponseJsonEntity;
    create(this: any, reqdata?: CreateTranslationResponseJsonCreateData, ctrl?: Control): Promise<CreateTranslationResponseJsonEntity>;
}
export { CreateTranslationResponseJsonEntity };

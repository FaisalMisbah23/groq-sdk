import { GroqEntityBase } from '../GroqEntityBase';
import type { GroqSDK } from '../GroqSDK';
import type { Control } from '../types';
import type { CreateTranscriptionResponseJson, CreateTranscriptionResponseJsonCreateData } from '../GroqTypes';
declare class CreateTranscriptionResponseJsonEntity extends GroqEntityBase<CreateTranscriptionResponseJson> {
    constructor(client: GroqSDK, entopts: any);
    make(this: CreateTranscriptionResponseJsonEntity): CreateTranscriptionResponseJsonEntity;
    create(this: any, reqdata?: CreateTranscriptionResponseJsonCreateData, ctrl?: Control): Promise<CreateTranscriptionResponseJsonEntity>;
}
export { CreateTranscriptionResponseJsonEntity };

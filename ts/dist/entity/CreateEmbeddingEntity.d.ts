import { GroqEntityBase } from '../GroqEntityBase';
import type { GroqSDK } from '../GroqSDK';
import type { Control } from '../types';
import type { CreateEmbedding, CreateEmbeddingCreateData } from '../GroqTypes';
declare class CreateEmbeddingEntity extends GroqEntityBase<CreateEmbedding> {
    constructor(client: GroqSDK, entopts: any);
    make(this: CreateEmbeddingEntity): CreateEmbeddingEntity;
    create(this: any, reqdata?: CreateEmbeddingCreateData, ctrl?: Control): Promise<CreateEmbeddingEntity>;
}
export { CreateEmbeddingEntity };

import { GroqEntityBase } from '../GroqEntityBase';
import type { GroqSDK } from '../GroqSDK';
import type { Control } from '../types';
import type { Model, ModelLoadMatch, ModelListMatch, ModelRemoveMatch } from '../GroqTypes';
declare class ModelEntity extends GroqEntityBase<Model> {
    constructor(client: GroqSDK, entopts: any);
    make(this: ModelEntity): ModelEntity;
    load(this: any, reqmatch?: ModelLoadMatch, ctrl?: Control): Promise<ModelEntity>;
    list(this: any, reqmatch?: ModelListMatch, ctrl?: Control): Promise<ModelEntity[]>;
    remove(this: any, reqmatch?: ModelRemoveMatch, ctrl?: Control): Promise<ModelEntity>;
}
export { ModelEntity };

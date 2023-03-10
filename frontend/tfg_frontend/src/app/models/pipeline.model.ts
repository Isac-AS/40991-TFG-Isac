export class Pipeline {
    constructor(
        public name: string,
        public description: string,
        public strategies: ShortStrategy[],
        
        public id?: number,
        public updated_at?: string,
        public created_at?: string,
        public created_by?: string,
        public last_modified_by?: string,
    ) {
    }
}

export interface ShortStrategy {
    id: number
    name: string
}

export interface PipelineRelatedResponse {
    result: boolean,
    pipeline: Pipeline,
    message: string
}

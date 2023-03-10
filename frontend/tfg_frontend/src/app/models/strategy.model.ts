export class Strategy {
    constructor(
        public name: string,
        public description: string,
        public python_file_path: string,
        public env_path: string,
        public input_type: string,
        public output_type: string,
        public stage: string,
        
        public id?: number,
        public updated_at?: string,
        public created_at?: string,
        public created_by?: string,
        public last_modified_by?: string,
    ) {
    }
}

export interface StrategyRelatedResponse {
    result: boolean,
    strategy: Strategy,
    message: string
}

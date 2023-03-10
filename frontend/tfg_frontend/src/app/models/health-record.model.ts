export class HealthRecord {
    constructor(
        public recording_path: string,
        public transcription: string,
        public health_record: string,
        public named_entity_recognition: any,
        public processing_outputs: IndividualOutput[],
        
        public id?: number,
        public updated_at?: string,
        public created_at?: string,
        public created_by?: string,
        public last_modified_by?: string,
    ) {
    }
}

export interface IndividualOutput {
    strategy_id: number
    strategy_name: string
    output: any
}

export interface HealthRecordRelatedResponse {
    result: boolean,
    healthRecord: HealthRecord,
    message: string
}

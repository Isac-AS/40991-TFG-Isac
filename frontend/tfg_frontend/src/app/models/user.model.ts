export class User {
    constructor(
        public mail: string,
        public username: string,
        public password: string,
        public role: string,
        public id?: number,
        public updated_at?: string,
        public created_at?: string,
        public last_updated_by?: string,
    ) {
    }
}
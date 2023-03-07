export class User {
    constructor(
        public email: string,
        public username: string,
        public password: string,
        public role: string,
        public is_admin?: boolean,
        public id?: number,
        public updated_at?: string,
        public created_at?: string,
        public created_by?: string,
        public last_updated_by?: string,
    ) {
    }
}
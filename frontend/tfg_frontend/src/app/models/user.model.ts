export class User {
    constructor (
        public mail: string,
        public username: string,
        public password: string,
        public role: string,
        public _id?: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
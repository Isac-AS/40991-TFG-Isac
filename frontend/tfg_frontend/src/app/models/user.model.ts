export class User {
    constructor (
        public mail: string,
        public username: string,
        private password: string,
        private role: string,
        public _id?: number,
        public updatedAt?: Date,
        public createdAt?: Date,
        public lastUpdatedBy?: string,
    ) {}
}
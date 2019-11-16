export class Question {
    public id: number;
    public statement: string;
    public type: string;

    constructor(obj?: any) {
        this.id = (obj || obj.id) ? obj.id : null;
        this.statement = (obj || obj.statement) ? obj.statement : null;
        this.type = (obj || obj.type) ? obj.type : null;
    }
}

export class Club {
    public id: number;
    public name: string;
    public imgPath: string;

    constructor(obj?: any) {
        this.id = (obj || obj.id) ? obj.id : null;
        this.name = (obj || obj.name) ? obj.name : null;
        this.imgPath = (obj || obj.img_path) ? obj.img_path : null;
    }
}

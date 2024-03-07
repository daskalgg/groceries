let id = 0;
export default class Todo {
    id: number;
    text: string;
    done: boolean;
    constructor() {
        this.id = id;
        this.text = "";
        this.done = false;
        id++;
    }
}
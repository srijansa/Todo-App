import { ListItem } from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: ListItem): void;
    removeItem(id: string): void;
}

export default class FullList implements List {
    static instance: FullList = new FullList;
    constructor(private _list: ListItem[] = []){
        this._list = _list;
    }

    get list(): ListItem[]{
        return this._list;
    }

    set list(value: ListItem[]){
        this._list = value;
    }
    load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== "string") return 
        const paresedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList);
        paresedList.forEach(itemObj=>{
            const newItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newItem);
        })
    }
    save(): void {
        localStorage.setItem("current_lsit", JSON.stringify(this._list));
    }

    clearList(): void {
        this._list = []
        this.save();
    }
    
    addItem(newItem: ListItem): void {
        this._list.push(newItem);
    }

    removeItem(itemId: string): void{
        this._list = this._list.filter(item => item.id !== itemId);
        this.save(); 
    }
}
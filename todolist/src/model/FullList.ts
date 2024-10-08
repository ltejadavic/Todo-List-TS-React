import ListItem from './ListItem';

export interface IFullList {
  list: ListItem[];  // Keep 'list' in the interface
}

export default class FullList implements IFullList {
  private static instance: FullList;
  private _items: ListItem[] = [];  // Use _items internally

  private constructor() {}  // Private constructor for Singleton pattern

  static getInstance(): FullList {
    if (!FullList.instance) {
      FullList.instance = new FullList();
    }
    return FullList.instance;
  }

  // Getter for 'items'
  get items(): ListItem[] {
    return this._items;
  }

  // Getter for 'list' to satisfy the IFullList interface
  get list(): ListItem[] {
    return this._items;
  }

  addItem(itemName: string): void {
    const newItem = new ListItem(undefined, itemName);
    this._items.push(newItem);
    this.save();
  }

  removeItem(id: string): void {
    this._items = this._items.filter(item => item.id !== id);
    this.save(); // Save the updated list to localStorage
  }

  clear(): void {
    this._items = [];
    localStorage.removeItem('todoList');
  }

  save(): void {
    localStorage.setItem('todoList', JSON.stringify(this._items));
  }

  load(): void {
    const storedItems = localStorage.getItem('todoList');
    if (storedItems) {
      this._items = JSON.parse(storedItems).map(
        (item: any) => new ListItem(item.id, item.item, item.checked)
      );
    }
  }
}
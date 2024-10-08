// src/model/ListItem.ts

import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique ids

export interface IListItem {
  id: string;
  item: string;
  checked: boolean;
}

export default class ListItem implements IListItem {
  constructor(
    public id: string = uuidv4(), // Generate unique id
    public item: string,
    public checked: boolean = false
  ) {}

  // Getter and setter for checked property
  getChecked(): boolean {
    return this.checked;
  }

  setChecked(checked: boolean): void {
    this.checked = checked;
  }

  // You could add additional getters or setters as needed
}
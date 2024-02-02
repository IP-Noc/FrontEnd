import { Component } from '@angular/core';
import { Item } from '../../../model/Item';
@Component({
  selector: 'app-addnoc',
  templateUrl: './addnoc.component.html',
  styleUrls: ['./addnoc.component.css']
})
export class AddnocComponent {
  nextId = 1;
  // Initialize the items with the type explicitly defined using the Item interface
  items: Item[] = [{ type: 'add', id: 0, number: 1 }];

  addNewItem(index: number) {
    const newNumber = this.items.filter(item => item.type === 'content').length + 1; // Compute correct number for new item
    this.items[index] = { type: 'content', id: this.nextId++, number: newNumber, active: true };
    this.items.push({ type: 'add', id: 0, number: newNumber + 1 }); // Add new 'add' button
  }

  deleteItem(itemId: number) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.active = false;
      // Remove item id from items list
      this.items = this.items.filter(item => item.id !== itemId);
      // Update the number of the remaining items
      this.items.filter(item => item.type === 'content').forEach((item, index) => item.number = index + 1);
    }
  }

}

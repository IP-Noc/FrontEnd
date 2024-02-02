export interface Item {
  type: string;
  id: number;
  number: number;
  active?: boolean; // Optional property to track if the item is to be shown
}
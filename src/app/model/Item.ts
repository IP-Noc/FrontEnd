export interface Item {
  id: number;
  number: number;
  active?: boolean; // Optional property to track if the item is to be shown
  apiLink: string;
  nameSource:string;
  type: string;
typeSource:string;
selectedIndice?: number; 
graphId?:string;
nameService?:string;
position?:number; 
}

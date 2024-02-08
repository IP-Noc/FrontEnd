export interface StepsData {
    NameStep: string
    Tasks: Task[]
  }
  
  export interface Task {
    Description: string
    State: number
    IsCompleted: boolean
    SubTasks?: SubTask[]
  }
  
  export interface SubTask {
    Description: string
    State: number
    IsCompleted: boolean
    SubTasks: any
  }
  
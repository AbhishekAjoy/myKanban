export interface TodoItem{
        id:string;
        name:string;
        estimate:string;
        timeSpent:string;
        status:Status;
        boardId:string ;
}

enum Status {
        Backlog,
        InProgress,
        OnHold,
        Rejected,
        Done
  }
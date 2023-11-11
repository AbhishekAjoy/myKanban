import { Observable } from "rxjs";
import { TodoItem } from "./todoItem";

export interface BoardItem{
    boardId: string;
    boardName: string;
    todos?: TodoItem[];
}
import { PersistentUnorderedMap, context, u128 } from "near-sdk-as";

@nearBindgen
export class Todo {
  id: string;
  todo: string;
  status: string;
  owner: string;
  createdAt: u128;
  public static fromPayload(payload: Todo): Todo {
    const todo = new Todo();
    todo.id = payload.id;
    todo.todo = payload.todo;
    todo.status = payload.status;
    todo.createdAt = payload.createdAt;
    todo.owner = context.sender;
    return todo;
  }
}

export const todosStorage = new PersistentUnorderedMap<string, Todo>("TODOSS");

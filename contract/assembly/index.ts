import { context } from "near-sdk-as";
import { Todo, todosStorage } from "./model";

export function newTodo(todo: Todo): void {
  const allTodos = todosStorage.values();
  let id = todosStorage.length;
  for (let i = 0; i < allTodos.length; i++) {
    id = parseInt(allTodos[i].id) === id ? id + 1 : id;
  }
  todo.id = id.toString();
  let storedTodo = todosStorage.get(todo.id);
  if (storedTodo !== null) {
    throw new Error(`a todo with id ${todo.id} already exists`);
  }
  todosStorage.set(todo.id, Todo.fromPayload(todo));
}

export function editTodo(todo: Todo): Todo {
  let myTodo = todosStorage.get(todo.id);
  if (!myTodo || myTodo.owner != context.sender) {
    throw new Error(`You can't edit this todo`);
  }
  if (todo.todo) {
    myTodo.todo = todo.todo;
  }
  todosStorage.set(todo.id, myTodo);
  const finalTodo = todosStorage.getSome(todo.id);
  return finalTodo;
}

export function markCompleted(id: string): Todo {
  let myTodo = todosStorage.get(id);
  if (!myTodo || myTodo.owner != context.sender) {
    throw new Error(`You can't edit this todo`);
  }
  myTodo.status = "1";

  todosStorage.set(id, myTodo);
  const finalTodo = todosStorage.getSome(id);
  return finalTodo;
}

export function deleteTodo(id: string): void {
  const myTodo = todosStorage.get(id);
  if (!myTodo || myTodo.owner != context.sender) {
    throw new Error(`You can't delete this todo`);
  }
  todosStorage.delete(id);
}

export function getTodos(sender: string): Todo[] | null {
  const allTodos = todosStorage.values();
  let filter: Todo[] = [];
  for (let i = 0; i < allTodos.length; i++) {
    allTodos[i].owner == sender && filter.push(allTodos[i]);
  }
  if (filter.length !== 0) {
    return filter;
  } else {
    return null;
  }
}

export function getTodo(sender: string, id: string): Todo | null {
  const todo = todosStorage.get(id);
  if (!todo || todo.owner != sender) {
    return null;
  }
  return todo;
}

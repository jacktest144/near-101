import { context } from "near-sdk-as";
import { Todo, todosStorage } from "./model";


/**
 * @dev allows a user to create a new to-do
 * @param todo the object containing the necessary details to initialize a new to-do 
 * 
 */
export function newTodo(todo: Todo): void {
  assert(todo.todo.length > 0, "Empty to-do");
  let id = todosStorage.length;
  todo.id = id.toString();
  let storedTodo = todosStorage.get(todo.id);
  if (storedTodo !== null) {
    throw new Error(`a todo with id ${todo.id} already exists`);
  }
  todosStorage.set(todo.id, Todo.fromPayload(todo));
}

/**
 * @dev allows a user to edit one of his to-dos
 * @param todo object containing the changes that needs to be made to the to-do
 * @returns the update to-do
 */
export function editTodo(todo: Todo): Todo {
  assert(todo.todo.length > 0, "Empty to-do");
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

/**
 * @dev allows a user to mark one of his to-do as complete
 * @param id index of to-do
 */
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

/**
 * @dev allows a user to delete one of his to-do
 * @param id index of to-do
 */
export function deleteTodo(id: string): void {
  const myTodo = todosStorage.get(id);
  if (!myTodo || myTodo.owner != context.sender) {
    throw new Error(`You can't delete this todo`);
  }
  todosStorage.delete(id);
}

/**
 * 
 * @param sender account to retrieve the to-dos
 * 
 * @returns all the to-dos of a user
 */
export function getTodos(sender: string): Todo[] | null {
  // Account names on testnet ends with .testnet
  assert(sender.length > 8, "Invalid account name"); 
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

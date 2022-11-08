import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

const nearEnv = environment("testnet");

export async function initializeContract() {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: ["getTodo", "getTodos"],
      changeMethods: ["newTodo", "editTodo", "markCompleted", "deleteTodo"],
    }
  );
}

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}

export function createTodo(todo) {
  todo.createdAt = Date.now().toString();
  window.contract
    .newTodo({ todo })
    .then((r) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
  return true;
}

export function deleteTodo(id) {
  window.contract
    .deleteTodo({ id })
    .then((r) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
  return true;
}

export function markCompleted(id) {
  window.contract
    .markCompleted({ id })
    .then((r) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
  return true;
}

export function editTodo(todo) {
  window.contract
    .editTodo({ todo })
    .then((r) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
  return true;
}

export async function getTodos() {
  const sender = await getAccountId();
  return window.contract.getTodos({ sender });
}

export function formatDate(date) {
  let datee = date.length > 13 ? date.slice(0, 13) : date;
  let dateee = new Date(parseInt(datee));
  const dat = dateee.toDateString() + ", " + dateee.toLocaleTimeString();
  return dat.toString();
}

/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from "react";
import Todos from "./components/Todos";
import { getTodos } from "./utils/near";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import AddModal from "./components/AddModal";
import ConfirmModal from "./components/ConfirmModal";
import EditModal from "./components/EditModal";

export default function Home() {
  const [showAdd, shouldShowAdd] = useState(false);
  const [showEdit, shouldShowEdit] = useState(null);
  const [showConfirm, shouldShowConfirm] = useState("");
  const [showModal, shouldShowModal] = useState("");
  const [todos, setTodos] = useState([]);
  const account = window.walletConnection.account();
  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  const fetchTodos = useCallback(async () => {
    if (account.accountId) {
      const allTodos = await getTodos();
      allTodos.forEach((todo, i) => {
        if (todo.status == 1) allTodos.move(i, -1);
      });
      console.log(allTodos);
      setTodos(allTodos);
    }
  });
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <Fragment>
      <Navbar bg="primary" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#">Todo App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:
              <a
                href={`https://explorer.testnet.near.org/accounts/${account.accountId}`}
              >
                {account.accountId}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col md="11">
            <h1>Your Todos</h1>
          </Col>
          <Col>
            <Button variant="light" onClick={() => shouldShowAdd(true)}>
              <i className="fa fa-plus" />
            </Button>
          </Col>
        </Row>

        {todos.length > 0 ? (
          <Fragment>
            {todos.sort((a, b) => b.createdAt - a.createdAt) &&
              todos.sort((a, b) => a.status - b.status) &&
              todos.map((todo, i) => {
                return (
                  <div key={i}>
                    <Todos
                      todo={todo}
                      shouldShowConfirm={shouldShowConfirm}
                      shouldShowModal={shouldShowModal}
                      shouldShowEdit={shouldShowEdit}
                    />
                    <EditModal
                      show={showEdit === todo.id}
                      handleClose={() => shouldShowEdit("")}
                      todo={todo}
                    />
                    <ConfirmModal
                      id={todo.id}
                      content={showConfirm}
                      show={showConfirm && showModal == todo.id ? true : false}
                      handleClose={() => {
                        shouldShowModal("");
                        shouldShowConfirm("");
                      }}
                    />
                  </div>
                );
              })}
          </Fragment>
        ) : (
          <p className="text-center">
            You don't have any todos here yet or they're loading
          </p>
        )}
      </Container>
      <AddModal show={showAdd} handleClose={() => shouldShowAdd(false)} />
    </Fragment>
  );
}

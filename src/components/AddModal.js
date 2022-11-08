import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createTodo } from "../utils/near";

export default function AddModal({ show, handleClose }) {
  const [clicked, setClicked] = useState(false);

  const [todo, setTodo] = useState({
    todo: "",
    status: "0",
  });
  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="todo"
              placeholder="What do you plan to do?"
              value={todo.todo}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={clicked}
          onClick={() => {
            setClicked(true);
            createTodo(todo);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

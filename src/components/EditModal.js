import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { editTodo } from "../utils/near";

export default function EditModal({ show, handleClose, todo }) {
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const [clicked, setClicked] = useState(false);

  const handleChange = (e) => {
    setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit this task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="todo"
              placeholder="40 characters max. Elaborate in description"
              value={editedTodo.todo}
              onChange={handleChange}
              maxLength={40}
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
            editTodo(editedTodo);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

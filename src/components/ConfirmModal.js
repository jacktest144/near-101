import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteTodo, markCompleted } from "../utils/near";

export default function ConfirmModal({ show, handleClose, content, id }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {content === "1"
            ? "Are you sure you want to mark this task as complete?"
            : "Are you sure you want to delete this task?"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={clicked}
          onClick={() => {
            setClicked(true);
            content === "1" ? markCompleted(id) : deleteTodo(id);
          }}
        >
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

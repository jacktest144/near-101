import React from "react";
import { Button, Card } from "react-bootstrap";
import { login } from "../utils/near";

export default function Login() {
  return (
    <Card id="login" text="dark" className="m-2">
      <Card.Body>
        <Card.Title>
          <i className="fas fa-book-reader p-2" />
          Near Todo List
        </Card.Title>
        <Card.Text>
          Create public and private stories from your life and see other's
          public stories
        </Card.Text>
        <div className="divider" />
        <div className="section">
          <Button variant="primary" size="sm" onClick={login}>
            Connect Wallet to Continue
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

import { Fragment } from "react";
import { formatDate } from "../utils/near";

export default function Todos({
  todo,
  shouldShowConfirm,
  shouldShowModal,
  shouldShowEdit,
}) {
  const checked = parseInt(todo.status) === 1;
  return (
    <Fragment>
      <h5 className="todo-cover" style={{ cursor: "pointer" }}>
        <div
          className="first"
          onClick={() => {
            if (!checked) {
              shouldShowModal(todo.id);
              shouldShowConfirm("1");
            }
          }}
        >
          <i className={`bi bi-${checked ? "check2-" : ""}circle me-2`}></i>
          <span
            style={
              checked
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {todo.todo}
          </span>
          <small>
            {" ("}
            {formatDate(todo.createdAt)} )
          </small>
        </div>
        <div>
          <i
            className="bi bi-pencil-square me-3"
            onClick={() => shouldShowEdit(todo.id)}
          ></i>
          <i
            className="bi bi-trash"
            onClick={() => {
              shouldShowModal(todo.id);
              shouldShowConfirm("2");
            }}
          ></i>
        </div>
      </h5>
    </Fragment>
  );
}

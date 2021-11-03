import React, { Fragment, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const { getAccessTokenSilently } = useAuth0();

  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const token = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:5001/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", authorization: `Bearear${token}` },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
      </button>

      <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div class="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e) => updateDescription(e)}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;

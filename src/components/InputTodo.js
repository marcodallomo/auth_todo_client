import React, { Fragment, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { description, user };

      if (description.length) {
        const token = await getAccessTokenSilently();
        const response = await fetch("http://localhost:5001/todos", {
          method: "POST",
          headers: { "Content-type": "application/json", authorization: `Bearer ${token}` },

          body: JSON.stringify(body),
        });
        window.location = "/";
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    isAuthenticated && (
      <Fragment>
        <h1 className="text-center mt-5">Todo List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="btn  myBtn">Add</button>
        </form>
      </Fragment>
    )
  );
};

export default InputTodo;

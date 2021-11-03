import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import EditTodo from "./EditTodo";
const ListTodos = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = useCallback(
    async (id) => {
      try {
        const token = await getAccessTokenSilently();
        const deleteTodo = await fetch(`http://localhost:5001/todos/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearear${token}` },
        });
        setTodos(todos.filter((todo) => todo.todo_id !== id));
      } catch (err) {
        console.error(err.message);
      }
    },
    [getAccessTokenSilently, todos]
  );

  const getTodos = useCallback(
    async (user_id) => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`http://localhost:5001/todos/${user.sub}`, {
          method: "GET",

          headers: { authorization: `Bearer${token}` },
        });

        const jsonData = await response.json();

        setTodos(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    },
    [getAccessTokenSilently]
  );

  useEffect(() => {
    if (user) {
      console.log("u", user);
      getTodos(user.sub);
    }
  }, [getTodos, user]);

  return (
    isAuthenticated && (
      <>
        <table className="table mt-5 text-center">
          <thead>
            <tr className="todoTitle">
              <th>Description</th>
              <th>edit</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
};

export default ListTodos;

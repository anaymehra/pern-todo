import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTodos from "./EditTodos";

function ListTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get("https://server-two-flax-81.vercel.app/todos");
        setTodos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTodos();
  });
  async function deleteTodo(id) {
    try {
      const response = await axios.delete(`https://server-two-flax-81.vercel.app/todos/${id}`);
      console.log(response);
      setTodos(todos.filter((todo)=> todo.todo_id !== id))
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="text-center">
      <div>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item) => {
              return (
                <tr key={item.todo_id}>
                  <td>{item.description}</td>
                  <td>
                    <EditTodos todo={item}/>
                  </td>
                  <td>
                    <button
                      className="btn "
                      onClick={() => {
                        deleteTodo(item.todo_id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTodos;
{
  /* <h2>{item.description}</h2>
            <EditTodos />
            <button className="btn " onClick={()=>{deleteTodo(item.todo_id)}}><svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg></button> */
}

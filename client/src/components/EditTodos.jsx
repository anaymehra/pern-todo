import React, { useState,useRef } from "react";
import axios from "axios";

function EditTodos({ todo }) {
  const [description, setDescription] = useState(todo.description);

  async function editTodo(id,e) {
    e.preventDefault();
    try {
        const response = await axios.put(`https://server-two-flax-81.vercel.app/todos/${id}`,{
            description:description
        })
    } catch (error) {
        console.log(error.message)
    }
    
  }
  return (
    <div>
      <button
        type="button"
        className="btn"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`} // target this
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>

      <div
        class="modal fade"
        id={`id${todo.todo_id}`} // target
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
              className="w-100"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button onClick={(e)=>{
                return (
                editTodo(todo.todo_id,e)
                
                )
                }} type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodos;

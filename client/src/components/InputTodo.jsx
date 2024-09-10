import React,{useState} from "react";
import axios from "axios";

function InputTodo() {

    const [description,setDescription] = useState("")
    async function onSubmitForm(e){
        e.preventDefault();
        try {
            const response = await axios.post("https://pern-todo-xgr7.onrender.com/todos",{
                description:description
            }); // the data description is send to the backend and handled using req.body.description with the help of express.json middleware
            console.log(response)
            setDescription('')
        } catch (err) {
            console.log(err.message)
        }
    }
    return ( 
    <>
        <h1 className="text-center mt-5">Pern Todo List</h1>
        <form onSubmit={onSubmitForm} action="" className="d-flex mt-5">
            <input type="text" className="form-control mr-2" value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
            <button className="btn btn-success">Add</button>
        </form>
    </> );
}

export default InputTodo;
import React from "react";
import { useState,useEffect } from "react";
import "./App.css"


const App = ()=>{
const [task, setTask] = useState([]);
const [inputValue, setInputValue] = useState("");

const handleSubmit = (e) => {
  // e.preventDefault();
  setTask((prev) => [...prev, inputValue]);
  setInputValue("");
}

const handleDelete = (value)=>{
  const updatedtask = task.filter((curtask)=>{ return curtask!==value})
  setTask(updatedtask)
}

useEffect(() => {
  console.log("Updated tasks:", task);
}, [task]);

  return(
    <>
     <section className="todo-container">
        <h1>Create your todo</h1>
        <div>
        <input
          type="text"
          className="input"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>  
        </div>
        <div>
        <ul>
        {task.map((t, index) => (
          <li key={index}>{t}
          <button className='btn' onClick={()=>handleDelete(t)}
          >delete</button>
          </li>
        ))}
      </ul>
      </div>
     </section>
    </>
  )
}

export default App;
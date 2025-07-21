import React from "react";
import { useState,useEffect } from "react";
import "./App.css"


const App = ()=>{
const [task, setTask] = useState([]);
const [inputValue, setInputValue] = useState("");
// const [check,setCheck]= useState(false);

const handleSubmit = (e) => {
  // e.preventDefault();
  setTask((prev) => [...prev, {text:inputValue,checked:false}]);
  setInputValue("");
}

const handleDelete = (value)=>{
  const updatedtask = task.filter((curtask)=>{ return curtask!==value})
  setTask(updatedtask)
}

const handleToggle = (content)=>{
  const updatedtask = task.map((t)=>{
    if(t.text==content.text){
      return {...t,checked:!content.checked}
    }
    return t;
  })
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
          <li key={index} >
          <span className= {t.checked ? "toggle":" "}>{t.text}</span>
          <div>
          <button className="btn1" onClick={()=>handleToggle(t)}>Toggle</button>
          <button className='btn' onClick={()=>handleDelete(t)}
          >delete</button>
          </div>
          </li>
        ))}
      </ul>
      </div>
     </section>
    </>
  )
}

export default App;
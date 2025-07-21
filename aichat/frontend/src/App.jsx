import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [subtask,setSubtask] = useState([]);

 const handleTask = async (e) => {
  e.preventDefault();
  
  if (!input) return;


  try {
    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }), 
    });

    if (!response.ok) {
      throw new Error("Failed to send data");
    }

    const data = await response.json(); 
    console.log("Response from server:", {question:input,answer:data});
    
    setTask((prev) => [...prev, {question:input,answer:data}]);
    setInput("");
  } catch (error) {
    console.error("Error sending input to backend:", error);
  }
};

const handleNewchat = ()=>{
  setTask([]);
}

useEffect(() => {
  if (task.length === 1) {
    console.log("Adding to subtask:", task[0]);
    setSubtask((prev)=>[...prev,task[0]]);
  }
}, [task]);


// useEffect(()=>{
//   handleTask()
// },[])

return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-500 p-4 flex flex-col">
        <button className="flex items-center gap-3 p-3 rounded-full text-sm bg-gray-800 transition-colors duration-200"
         onClick={handleNewchat}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New chat
        </button>
        <div>
          {subtask.map((t,i)=>(
          <p key={i}>{t.question}</p>
          ))}
        </div>

      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          {task.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-4"></div>
              <h1 className="text-2xl text-gray-400">How can I help you today?</h1>
            </div>
          ) : (
            <div className="space-y-8">
              {task.map((t, i) => (
                <div key={i} className="space-y-4">

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <p className="pt-1">{t.question}</p>
                  </div>
     
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0"></div>
                    <p className="pt-1 text-gray-300">{t.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4">
          <form onSubmit={handleTask} className="w-full max-w-3xl mx-auto bg-gray-800 rounded-2xl flex items-center p-2 shadow-lg">
            <input
              type="text"
              name="prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent px-4 py-2 focus:outline-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 transition-colors"
              disabled={!input}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );

};

export default App;

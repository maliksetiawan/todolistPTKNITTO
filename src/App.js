import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodos(savedTodos); 
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos(todos.map(todo => todo.id === editId ? { id: todo.id, text: input } : todo));
      setEditId(null);
      Swal.fire({
        title: 'Success!',
        text: 'Task updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      setTodos([...todos, { id: Date.now(), text: input }]);
      Swal.fire({
        title: 'Success!',
        text: 'Task added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }

    setInput(""); 
  };

  const handleEditTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setInput(todo.text);
    setEditId(id);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    Swal.fire({
      title: 'Deleted!',
      text: 'Task deleted successfully!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">To-Do List</h1>
      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-blue-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="Add a new task..."
        />
        <button
          onClick={handleAddTodo}
          className={`px-4 py-2 rounded-r text-white font-semibold transition-all 
                      ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="w-full max-w-lg">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-4 mb-3 rounded-lg shadow hover:shadow-md transition-shadow">
            <span className="text-gray-700">{todo.text}</span>
            <div>
              <button
                onClick={() => handleEditTodo(todo.id)}
                className="text-yellow-500 hover:text-yellow-600 font-medium mr-4 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 font-medium transition-all"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

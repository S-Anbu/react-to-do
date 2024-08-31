import { useState, useEffect } from 'react';
import './App.css';
import tick from "./assets/tick.png";
import trash from "./assets/trash.png";
import todo_icon from "./assets/todo_icon.png";

function App() {
  // Initialize tasks from local storage or set to empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  // Function to handle changes in the input field
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Function to add a new task
  function addTask() {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        { text: newTask, completed: false }
      ];
      setTasks(updatedTasks);
      setNewTask('');
    }
  }

  // Function to remove a task
  function strike(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Function to toggle the completion status of a task
  function toggleCompletion(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className='max-w-md h-auto mt-40 p-2 rounded mx-auto bg-slate-100'>
        <div className='bg-orange-400 rounded py-5 flex space-x-3 items-center text-white justify-center'>
          <img className='w-8' src={todo_icon} alt="" />
          <h1 className='text-2xl font-bold '> TO DO LIST</h1>
        </div>
        <div className='flex justify-center my-4'>
          <input
            value={newTask}
            onChange={handleInputChange}
            className='outline-none px-4 py-2 border-b-2 border-b-orange-500'
            type="text"
            placeholder='Add a New Task'
          />
          <button
            onClick={addTask}
            className='px-4 py-2 bg-orange-500 text-white rounded-xl ml-2'>
            <span>Add</span>
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <div className='flex justify-around px-10' key={index}>
              <li
                className='flex-1 justify-between items-center mb-2 cursor-pointer'
                onClick={() => toggleCompletion(index)}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              >
                <div className='flex items-center'>
                  <img className='w-4 h-4 mr-2' src={tick} alt="tick" />
                  <span>{task.text}</span>
                </div>
              </li>
              <button onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the click event on the <li>
                strike(index);
              }}>
                <img className='w-4 h-4' src={trash} alt="trash" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

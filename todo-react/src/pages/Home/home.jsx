import  { useState } from 'react';
import './home.css';
import { FaTrash, FaEdit, FaCheckCircle, FaCircle } from 'react-icons/fa';

const Home = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddTask = () => {
    if (value.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) => 
        index === editIndex ? { ...task, text: value } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: value, completed: false }]);
    }
    setValue("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleEditTask = (index) => {
    setValue(tasks[index].text);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className='container'>
      <h1 className='h1'>TO DO LIST</h1>
      <div className='data'>
        <input 
          type="text"
          placeholder='What is the task today?'
          value={value}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button type='submit' className='btn' onClick={handleAddTask}>
          {editIndex !== null ? 'Edit Task' : 'Add a task'}
        </button>
      </div>
      <ul className='list'>
        {tasks.map((task, index) => (
          <li key={index} className='item' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <div 
              className={`checkbox ${task.completed ? 'completed' : ''}`} 
              onClick={() => handleToggleComplete(index)} 
            >
              {task.completed ? <FaCheckCircle /> : <FaCircle />}
            </div>
            <span>{task.text}</span>
            <div className='icons'>
              <FaEdit className='edit' onClick={() => handleEditTask(index)} />
              <FaTrash className='delete' onClick={() => handleDeleteTask(index)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;



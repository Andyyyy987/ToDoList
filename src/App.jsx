import { useState } from 'react'
import './App.css'

const App = () => {  
  const [newTask, setNewTask] = useState("")
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    // Preventing page from refreshing
    e.preventDefault()

    // New task function
    setTodos (currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), title: newTask, completed: false
        },
      ]
    })
    // set new task to an empty array to clear previous input
    setNewTask("")
  }

  // Completed task function
  const toggleTodo = (id, completed) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }

        return todo
      })
    })
  }

  // Deleted task function
  const deleteTodo = (id) => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // using css for To Do List layout
  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>New Task</label>
          <input value={newTask} onChange={e => setNewTask(e.target.value)} type="text" id='item' />      
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>To Do List</h1>
      <ul className='list'>
        {/* Checking if no tasks and if so rendering to screen */}
        {todos.length === 0 && "No Tasks"}
        {/* Mapping task function */}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
              </label>
              {/* Function to delete task when click delete button */}
              <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App

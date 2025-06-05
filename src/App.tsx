import { useState } from "react"
import Todo from "./components/Todo"
import type { ITodo } from "./types/ITodo"
import type { FilterType } from "./types/FilterType"
import "./App.css"

function App() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [value, setValue] = useState<string>("")
  const [filter, setFilter] = useState<FilterType>("all")

  const addTodo = () => {
    if (value.trim()) {
      const newTodo: ITodo = {
        id: Date.now(),
        text: value,        
        completed: false,
      }
      setTodos([...todos, newTodo])
      setValue("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const activeTodosCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="container">
      <h1>Todos</h1>

      <div className="input-container">
        <input type="text" onChange={(e) => setValue(e.target.value)} value={value} placeholder="Write a new task" onKeyDown={(e) => e.key === "Enter" && addTodo()} />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
          All ({todos.length})
        </button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>
          Active ({activeTodosCount})
        </button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>
          Completed ({todos.length - activeTodosCount})
        </button>
      </div>

      {todos.length > 0 && (
        <button onClick={clearCompleted} className="clear-btn">
          Clear completed
        </button>
      )}

      <div className="todos-list">
        {filteredTodos.length ? (
          filteredTodos.map((todo) => <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />)
        ) : (
          <p className="empty-message">{filter === "all" ? "The task list is empty" : filter === "active" ? "No active tasks" : "No completed tasks"}</p>
        )}
      </div>
    </div>
  )
}

export default App

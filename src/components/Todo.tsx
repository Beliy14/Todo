import React from "react"
import type { ITodo } from "../types/ITodo"
import "./Todo.css"

interface ITodoProps {
  todo: ITodo
  toggleTodo: (id: number) => void
}

const Todo: React.FC<ITodoProps> = ({ todo, toggleTodo }) => {
  return (
    <div className="todo">
      <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.7 : 1,
        }}
      >
        {todo.text}
      </span>
    </div>
  )
}

export default Todo

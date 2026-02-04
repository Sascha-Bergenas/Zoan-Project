import { useState } from "react";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/Button";
import "./Todo.css";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [{ id: Date.now(), text: input }, ...prev]);

    setInput("");
  };

  return (
    <>
      <div className="todo-wrapper">
        <Input
          type="text"
          label="Kom ihåg"
          name="todo"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Kom ihåg att..."
        />
        <Button onClick={addTodo} text="+" variant="primary"></Button>
      </div>

      <ul className="li-wrapper">
        {todos.map((todo) => (
          <li className="li-item" key={todo.id}>
            <span className="todo-text">{todo.text}</span>

            <button
              className="todo-button"
              aria-label={`Ta bort ${todo.text}`}
              onClick={() =>
                setTodos((prev) => prev.filter((t) => t.id !== todo.id))
              }
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Todo;

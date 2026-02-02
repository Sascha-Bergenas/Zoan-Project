import { useState } from "react";
import Input from "../input/Input";
import Button from "../Button";
import "./Todo.css";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input }]);

    setInput("");
  };

  return (
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
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default Todo;

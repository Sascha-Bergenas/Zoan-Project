import { useState } from "react";
import Input from "../input/Input";
import Button from "../Button";
import "./Todo.css";
import BaseCard from "../cards/Card";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input }]);

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
      <div className="list-wrapper">
        <ul className="ul-wrapper">
          {todos.map((todo) => (
            <div className="li-wrapper">
              <li key={todo.id}>{todo.text}</li>
              <button className="todo-button">x</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Todo;

import { useEffect, useState } from "react";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import "./Todo.css";
import { todoStore } from "../../storage/localStorage";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [{ id: Date.now(), text: input }, ...prev]);

    setInput("");
  };

  useEffect(() => {
    todoStore.add(todos);
  }, [todos]);

  return (
    <>
      <h3 className="todo-header">Todo</h3>
      <div className="todo-wrapper">
        <Input
          className="todo-input"
          type="text"
          label="Kom ihåg"
          name="todo"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Kom ihåg att..."
        />
        <Button
          onClick={addTodo}
          text="+"
          variant="primary"
          className="todo-add-btn"
        ></Button>
      </div>

      <ul className="li-wrapper">
        {todos.length === 0 ? (
          <li className="todo-text">Inga todos än. Lägg till något!</li>
        ) : (
          todos.map((todo) => (
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
          ))
        )}
      </ul>
    </>
  );
};
export default Todo;

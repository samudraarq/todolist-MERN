import React from "react";
import axios from "axios";

const Form = ({ setInputText, inputText, todos, setTodos, setStatus }) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    const newTodo = { text: inputText };
    axios.post("/todos", newTodo).then((res) => setTodos([...todos, res.data]));
    // setTodos([...todos, newTodo]);
    setInputText("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitTodoHandler}>
        <input
          type="text"
          className="todo-input"
          onChange={inputTextHandler}
          value={inputText}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" onChange={statusHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Form;

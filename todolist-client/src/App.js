import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    // getLocalTodos();
    axios.get("/todos").then((res) => setTodos(res.data));
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [status, todos]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //get from local storage
  const getLocalTodos = () => {
    if (localStorage.getItem("todos" === null)) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todosLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todosLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;

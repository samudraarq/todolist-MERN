import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, filteredTodos, setTodos }) => {
  const todoList = filteredTodos.map((todo) => (
    <Todo todo={todo} key={todo._id} setTodos={setTodos} todos={todos} />
  ));
  return (
    <div className="todo-container">
      <ul className="todo-list">{todoList}</ul>
    </div>
  );
};

export default TodoList;

import React from "react";
import Axios from "axios";

const Todo = ({ todo, setTodos, todos }) => {
  const deleteHandler = () => {
    Axios.delete(`/todos/${todo._id}`).then(() => {
      const newTodos = todos.filter((item) => item._id !== todo._id);
      setTodos(newTodos);
    });
  };

  const completeHandler = () => {
    let completedStatus = !todo.completed;
    console.log(completedStatus);
    Axios.patch(`/todo/status/${todo._id}`, { status: completedStatus }).then(
      () => {
        console.log("status changed");
      }
    );

    const newTodos = todos.map((item) => {
      if (item._id === todo._id) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed && "completed"}`}>
        {todo.text}
      </li>
      <button className="complete-btn" onClick={completeHandler}>
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn" onClick={deleteHandler}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;

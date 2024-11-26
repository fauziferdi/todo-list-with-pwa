import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, curentTodo } from "../redux/slices/todoSlice";

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.lang);

  if (todos.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        <p>
          {lang === "id"
            ? "Tidak ada tugas yang ditemukan."
            : "No todos found."}
        </p>
      </div>
    );
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          onClick={() => dispatch(toggleTodo(todo.id))}
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-secondary" : ""
          }`}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div>
            <button
              onClick={(e) => dispatch(curentTodo(todo), e.stopPropagation())}
              className="btn btn-primary btn-sm me-2"
            >
              {lang === "id" ? "Edit" : "Update"}
            </button>
            <button
              onClick={(e) =>
                dispatch(deleteTodo(todo.id), e.stopPropagation())
              }
              className="btn btn-danger btn-sm"
            >
              {lang === "id" ? "Hapus" : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

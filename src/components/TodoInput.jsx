// src/components/TodoInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../redux/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { isUpdate, todo } = useSelector((state) => state.todos);
  const { lang } = useSelector((state) => state.lang);

  useEffect(() => {
    if (todo?.id) {
      setText(todo.text);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (isUpdate) {
        dispatch(
          updateTodo({
            ...todo,
            text,
          })
        );
      } else {
        dispatch(
          addTodo({
            id: uuidv4(),
            text,
            completed: false,
          })
        );
      }
      setText("");
    }
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className={isUpdate ? `btn btn-warning` : `btn btn-success`}
        >
          {isUpdate
            ? lang === "id"
              ? "Edit"
              : "Update"
            : lang === "id"
            ? "Tambah"
            : "Add"}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;

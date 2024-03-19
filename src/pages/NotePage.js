import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState();
  function getCookie(name) {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }

  const navigate = useNavigate();
  const csrftoken = getCookie("csrftoken");

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };
  let createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      "X-CSRFToken": csrftoken,
      body: JSON.stringify(note),
    });
  };
  let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      "X-CSRFToken": csrftoken,
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });
    navigate("/");
  };

  let handleSubmit = () => {
    console.log(note);
    if (id !== "new" && note.body === "") {
      deleteNote();
      console.log("delete triggered");
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
    // history.push("/");
    navigate("/");
  };
  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
  };
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;

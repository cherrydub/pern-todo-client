import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useCookies } from "react-cookie";

const serverURL = import.meta.env.VITE_SERVERURL;

export default function Modal({ setShowModal, mode, task, getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === "edit" ? true : false;

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverURL}/todos`, data);

      if (response.status === 200) {
        setShowModal(false);

        getData();
        toast.success(`task added`);
      }
    } catch (error) {
      toast.error("catch error");
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${serverURL}/todos/${task.id}`, data);
      if (response.status === 200) {
        setShowModal(false);
        getData();
        toast.success(`task updated`);
      }
    } catch (error) {
      toast.error("catch error");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="overlay">
        <div className="Modal">
          <div className="form-title-container">
            <h3>Let's {mode} your task</h3>

            <button onClick={() => setShowModal(false)}>x</button>
          </div>
          <form action="">
            <input
              required
              maxLength={30}
              placeholder=" Your task goes here"
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="range">Drag to select your current progress</label>
            <input
              required
              min="0"
              max="100"
              name="progress"
              value={data.progress}
              onChange={handleChange}
              type="range"
            />

            <input
              className={mode}
              type="submit"
              onClick={editMode ? editData : postData}
            />
          </form>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import axios from "axios";
import { Toaster, toast } from "sonner";

const serverURL = import.meta.env.VITE_SERVERURL;

export default function ListItem({ task, getData }) {
  const [showModal, setShowModal] = useState(false);
  const deleteItem = async () => {
    try {
      // toast.loading("deleting...", { duration: 0 }); // Set duration to 0 to keep the loading toast open
      // Perform the axios request
      const response = await axios.delete(`${serverURL}/todos/${task.id}`);

      if (response.status === 200) {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        getData();
        toast(`task deleted`);
      }
    } catch (error) {
      // Show an error toast
      toast.error("catch error");
      console.error(error);
    }
  };

  return (
    <>
      <li className="List-Item">
        <div className="info-container">
          <TickIcon />
          <p className="task-title">{task.title}</p>
          <ProgressBar />
        </div>
        <div className="button-container">
          <button className="edit" onClick={() => setShowModal(true)}>
            EDIT
          </button>

          <button
            className="delete"
            onClick={() => {
              deleteItem();
            }}
          >
            DELETE
          </button>
        </div>
        {showModal && (
          <Modal
            mode={"edit"}
            setShowModal={setShowModal}
            task={task}
            getData={getData}
          />
        )}
      </li>
    </>
  );
}

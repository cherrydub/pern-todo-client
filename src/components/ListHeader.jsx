import React, { useState } from "react";
import Modal from "./Modal";
import { Toaster, toast } from "sonner";
import { useCookies } from "react-cookie";

export default function ListHeader({ listName, getData }) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);

  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="List-Header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button onClick={signOut} className="signout">
          SIGN OUT
        </button>
      </div>

      {showModal && (
        <>
          <Modal
            mode={"create"}
            setShowModal={setShowModal}
            getData={getData}
          />
        </>
      )}
    </div>
  );
}

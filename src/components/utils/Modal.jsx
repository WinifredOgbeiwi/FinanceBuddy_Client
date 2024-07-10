import React from "react";
import { FaTimes } from "react-icons/fa";
import ModalReact from "react-modal";
import ModalForm from "./ModalForm";

const Modal = ({
  isOpen,
  isClose,
  title,
  handleSubmit,
  stateData,
  setStateData,
  loading,
}) => {
  ModalReact.setAppElement("#root");

  return (
    <ModalReact
      isOpen={isOpen}
      appElement={document.getElementById("root")}
      className=" absolute inset-5 md:inset-10 md:w-1/2 m-auto border-2 border-main bg-white outline-none overflow-auto rounded-main"
    >
      <div className="flex items-center gap-3 justify-between bg-secondary2 p-3">
        <h3 className="text-main font-semibold text-xl">{title}</h3>
        <FaTimes
          onClick={() => isClose(false)}
          className="  text-xl cursor-pointer hover"
        />
      </div>
      <div className="mt-3 p-3">
        <ModalForm
          handleSubmit={handleSubmit}
          stateData={stateData}
          setStateData={setStateData}
          loading={loading}
        />
      </div>
    </ModalReact>
  );
};

export default Modal;

import { useState } from "react";
import Modal from "react-modal";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
Modal.setAppElement("#root");

export const ModalAddTransaction = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onAfterOpen={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            border: "none",
            width: "320px",
            height: "600px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.10)",
          },
        }}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onKeyDown={handleKeyDown}
      >
        <>
          <AddTransactionForm closeModal={closeModal} />
        </>
      </Modal>
    </div>
  );
};
export default ModalAddTransaction;

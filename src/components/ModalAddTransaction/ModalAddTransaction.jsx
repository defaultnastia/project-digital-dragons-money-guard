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
        className="flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        onKeyDown={handleKeyDown}
      >
        <div className="bg-gradient-to-b from-purple-800 to-indigo-900 rounded-lg">
          <AddTransactionForm closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddTransaction;

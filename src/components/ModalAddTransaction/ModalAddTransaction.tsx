import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

export const ModalAddTransaction: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <CustomModal isOpen={modalIsOpen} onClose={closeModal} type="transaction">
        <AddTransactionForm closeModal={closeModal} />
      </CustomModal>
    </div>
  );
};

export default ModalAddTransaction;

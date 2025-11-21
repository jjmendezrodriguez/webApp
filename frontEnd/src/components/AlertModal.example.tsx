// Example usage of AlertModal component
// This file demonstrates how to use the AlertModal in your components

import { useState } from "react";
import AlertModal from "@/components/AlertModal";

export default function AlertModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Open Alert Modal
      </button>

      <AlertModal
        isOpen={isOpen}
        onClose={closeModal}
        title="¡Alerta!"
        message="Este es un mensaje de ejemplo del modal."
        shadowColor="shadow-violet-500"
        closeOnBackdropClick={true}
        extraButton={
          <button
            onClick={closeModal}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Cerrar
          </button>
        }
      />
    </div>
  );
}

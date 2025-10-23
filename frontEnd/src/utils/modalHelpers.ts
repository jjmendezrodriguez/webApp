// Modal helper utilities
// Reusable functions for modal management

/**
 * Creates a close handler for modals
 * Returns a function that closes the modal and optionally executes cleanup
 * @param setIsOpen - State setter for modal open/close
 * @param onCleanup - Optional cleanup function to execute after closing
 * @returns Close handler function
 */
export const createModalCloseHandler = (
  setIsOpen: (isOpen: boolean) => void,
  onCleanup?: () => void,
) => {
  return () => {
    setIsOpen(false);
    if (onCleanup) {
      onCleanup();
    }
  };
};

/**
 * Generic close alert handler
 * Closes an alert/modal by setting state to false
 * @param setState - State setter function
 */
export const handleCloseAlert = (setState: (value: boolean) => void) => {
  return () => {
    setState(false);
  };
};

/**
 * Close modal with form reset
 * Closes modal and resets form state
 * @param setIsOpen - Modal state setter
 * @param resetForm - Form reset function
 */
export const closeModalWithReset = (
  setIsOpen: (isOpen: boolean) => void,
  resetForm: () => void,
) => {
  return () => {
    resetForm();
    setIsOpen(false);
  };
};

/**
 * Switch between two modals safely
 * Closes current modal and opens target modal
 * @param closeCurrentModal - Function to close current modal
 * @param openTargetModal - Function to open target modal
 * @param resetForm - Optional form reset function
 */
export const switchModal = (
  closeCurrentModal: () => void,
  openTargetModal: () => void,
  resetForm?: () => void,
) => {
  return () => {
    if (resetForm) {
      resetForm();
    }
    closeCurrentModal();
    openTargetModal();
  };
};

/**
 * Handle backdrop click for modals
 * Only closes modal if not loading
 * @param isLoading - Loading state
 * @param onClose - Close function to call when conditions are met
 * @returns Backdrop click handler
 */
export const createBackdropClickHandler = (
  isLoading: boolean,
  onClose: () => void,
) => {
  return () => {
    if (!isLoading) {
      onClose();
    }
  };
};

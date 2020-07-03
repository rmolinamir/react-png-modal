/**
 * Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
 * interacting with the modal's children elements.
 */
export function stopPropagation(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  e.stopPropagation();
}

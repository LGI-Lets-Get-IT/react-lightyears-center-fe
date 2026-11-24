import { useCallback } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const DEFAULT_UNDO_WINDOW_MS = 5000;

// Shared, reusable "undoable delete" affordance. Instead of guarding a
// destructive delete behind a confirmation dialog, the caller removes the
// record optimistically and hands us the window during which the user can
// take it back. We surface an Undo toast; if the window elapses untouched the
// delete is finalized (onCommit), if Undo is pressed the record is restored
// (onUndo). Built on sweetalert2 so it matches the toasts already used here.
const useUndoableDelete = () => {
  const showUndoableDelete = useCallback(
    ({
      message = "Item deleted",
      duration = DEFAULT_UNDO_WINDOW_MS,
      onUndo,
      onCommit,
    }) => {
      MySwal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
        confirmButtonText: "Undo",
        timer: duration,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).then((result) => {
        if (result.isConfirmed) {
          onUndo?.();
        } else if (result.dismiss === Swal.DismissReason.timer) {
          onCommit?.();
        }
      });
    },
    []
  );

  return { showUndoableDelete };
};

export default useUndoableDelete;

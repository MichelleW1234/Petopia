import { useEffect } from "react";

export default function useCloseWindow(onClose) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      onClose();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [onClose]);
}
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useOneTimeToast(key: string, message: string) {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem(key);
    if (!shown) {
      toast.success(message);
      localStorage.setItem(key, "true");
      setHasShown(true);
    }
  }, [key, message]);

  return hasShown;
}

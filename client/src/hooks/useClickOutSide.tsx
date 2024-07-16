import { useEffect, useRef } from "react";

export default function useClickOutside(callback: () => void) {
  const ref: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current && ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [callback]);

  return ref;
}

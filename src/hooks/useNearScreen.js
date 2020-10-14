import { useState, useEffect, useRef } from "react";

export function useNearScreen() {
  const el = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== "undefined"
        ? window.IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      const observer = new window.IntersectionObserver(function (entries) {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      });
      observer.observe(el.current);
    });
  }, [el]);

  return [show, el];
}

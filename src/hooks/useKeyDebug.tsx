import { useEffect } from "react";

function useKeyDebug(): void {
  useEffect(() => {
    window.addEventListener("keydown", e => {
      const states = {
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
      };
      const key = e.key;
      const code = e.code;
      // console.log(`key: ${key}, code: ${code}`, states);
      console.log(`key: ${key}, code: ${code}`);
    });
  }, []);
}

export { useKeyDebug };

"use client";

/* LeBonBureau — toast. A single bottom-center pill, shown via useToast().toast(msg). */

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ToastContextValue {
  toast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((message: string) => {
    setMsg(message);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={
          "fixed left-1/2 bottom-7 -translate-x-1/2 bg-ink text-white py-[13px] px-[22px] rounded-full text-[14.5px] font-medium shadow-lift pointer-events-none transition-[opacity,transform] duration-[250ms] ease-[ease] z-[80] " +
          (show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")
        }
        role="status"
        aria-live="polite"
      >
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

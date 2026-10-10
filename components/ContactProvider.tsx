"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ContactCtx = {
  open: boolean;
  openPanel: () => void;
  closePanel: () => void;
};
const Ctx = createContext<ContactCtx | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openPanel = useCallback(() => setOpen(true), []);
  const closePanel = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ open, openPanel, closePanel }),
    [open, openPanel, closePanel],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContact() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useContact must be used inside <ContactProvider>");
  return c;
}

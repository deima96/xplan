"use client";

import { useState, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "sending" | "ok" | "error"; text: string }>({
    kind: "idle",
    text: "",
  });

  function validate(d: FormData): Errors {
    const e: Errors = {};
    if (!String(d.get("name") ?? "").trim()) e.name = "Please tell us your name.";
    if (!EMAIL_RE.test(String(d.get("email") ?? "").trim())) e.email = "Please enter a valid email address.";
    if (!String(d.get("message") ?? "").trim()) e.message = "Please write a short message.";
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus({ kind: "sending", text: "Sending…" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus({
        kind: "ok",
        text: json.delivered
          ? "Thanks! We'll get back to you soon."
          : "Thanks! (Development mode — email delivery isn't configured, so nothing was sent.)",
      });
    } catch (err) {
      setStatus({
        kind: "error",
        text: err instanceof Error ? err.message : "Couldn't send your message. Please try again.",
      });
    }
  }

  const field = (id: "name" | "email" | "subject" | "message", label: string, opts: { type?: string; textarea?: boolean; auto?: string } = {}) => {
    const err = id !== "subject" ? errors[id as keyof Errors] : undefined;
    const common = {
      id: `f-${id}`,
      name: id,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `e-${id}` : undefined,
      autoComplete: opts.auto,
    } as const;
    return (
      <div className={`field${err ? " bad" : ""}`}>
        <label htmlFor={`f-${id}`}>{label}</label>
        {opts.textarea ? <textarea {...common} /> : <input {...common} type={opts.type ?? "text"} />}
        {err && (
          <div className="err" id={`e-${id}`}>
            {err}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      {field("name", "Your Name", { auto: "name" })}
      {field("email", "Your Email", { type: "email", auto: "email" })}
      {field("subject", "Subject")}
      {field("message", "Your Message", { textarea: true })}
      <button className="submit" type="submit" disabled={status.kind === "sending"}>
        Submit
      </button>
      <p className="status" role="status" aria-live="polite" data-kind={status.kind}>
        {status.text}
      </p>
      <address className="addr">
        1st floor, No.5EC-702, HRBR Layout 2nd Block, HRBR Layout, Kalyan Nagar, Bengaluru, Karnataka 560113
      </address>
    </form>
  );
}

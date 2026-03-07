"use client";

import { useState } from "react";

interface FormState {
    name: string;
    email: string;
    message: string;
}

type Status = "idle" | "loading" | "success" | "error";

export function useContactForm() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Something went wrong");
            }

            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Unknown error");
        }
    }

    return { form, status, errorMessage, handleChange, handleSubmit };
}

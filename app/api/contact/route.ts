import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // If Resend API key is set, use it
        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        if (RESEND_API_KEY) {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Portfolio Contact <onboarding@resend.dev>",
                    to: ["info.dhruvsoin@gmail.com"],
                    subject: `New message from ${name} — Portfolio`,
                    html: `
                        <div style="font-family: monospace; max-width: 600px;">
                            <h2>New Contact Form Submission</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <hr/>
                            <p><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">${message}</p>
                        </div>
                    `,
                    reply_to: email,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                console.error("[Contact] Resend error:", err);
                return NextResponse.json({ error: "Email failed" }, { status: 500 });
            }

            return NextResponse.json({ success: true });
        }

        // Fallback: just log (no email service configured)
        console.log("[Contact] New message — no email service configured:", { name, email, message });
        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("[Contact API]", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

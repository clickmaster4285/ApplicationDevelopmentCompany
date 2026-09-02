import { sendMail } from "@/app/actions/sendMail";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await sendMail(payload);

  if (!result.ok) {
    return Response.json(
      { error: result.error ?? "Email could not be sent." },
      { status: result.error?.includes("required") ? 400 : 500 },
    );
  }

  return Response.json({ ok: true });
}

import { sendMail } from "@/lib/send-mail";

export async function POST(req: Request) {
  const { email, text } = await req.json();

  if (!email || !text) {
    return new Response('Missing required fields', { status: 400 });
  }

  try {
    const mailResponse = await sendMail({
      email,
      subject: 'New Class Registration',
      text,
    });
    return new Response(JSON.stringify(mailResponse), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response('Failed to send email', { status: 500 });
  }
}
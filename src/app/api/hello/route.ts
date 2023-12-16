import { db } from "@/lib/db";
import { env } from "@/lib/env.mjs";
import { userAuthSchema } from "@/lib/validation/auth";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "postmark";

const client = new Client(env.POSTMARK_API_TOKEN);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email } = await req.json();
    const parsedEmail = userAuthSchema.parse({ email });
    console.log(email);
    // client.sendEmail({
    //   From: "venkateshsundarasan@gmail.com",
    //   To: parsedEmail.email,
    //   Subject: "Hello from Postmark",
    //   HtmlBody: "<strong>Hello</strong> dear Postmark user.",
    //   TextBody: "Hello from Postmark!",
    //   MessageStream: "authentication",
    // });

    const user = await db.user.create({
      data: {
        name: "venkat",
        email: parsedEmail.email,
      },
    });

    console.log(user);
    return new Response(parsedEmail.email, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}

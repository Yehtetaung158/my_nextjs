"use server";

import DropboxResetPasswordEmail from "@/components/email-template";
import { getBaseUrl } from "@/lib/get-baseUrl";
import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
const resend = new Resend("re_YAXKWvqM_4fGU7ktTjeNjeTK9hXZZwHtX");

export const sendEmail = async (
  email: string,
  token: string,
  userFirstName: string
) => {
  const confirmEmailLink = `${getBaseUrl()}/confirm-email?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    // to: ["delivered@resend.dev"],
    to: email,
    subject: "Hello world",
    react: DropboxResetPasswordEmail({ userFirstName, confirmEmailLink }),
  });

  if (error) {
    console.log(error);
  }

  //   res.status(200).json(data);
};

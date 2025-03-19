"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailVerificationToken, users } from "../schema";
import { resetPasswordToken } from "../schema";

const checkEmailValidationToken = async (
  email: string | null,
  token?: string
) => {
  try {
    let ValidationToken:
      | {
          id: string;
          email: string;
          token: string;
          expired: Date;
        }
      | undefined;
    if (email) {
      const ValidationToken = await db.query.emailVerificationToken.findFirst({
        where: eq(emailVerificationToken.email, email!),
      });
      return ValidationToken;
    } else if (token) {
      const ValidationToken = await db.query.emailVerificationToken.findFirst({
        where: eq(emailVerificationToken.token, token),
      });
      return ValidationToken;
    }
  } catch (err) {
    return null;
  }
};

export const generateEmailValidationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000);
  const existingToken = await checkEmailValidationToken(email);
  if (existingToken) {
    await db
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken.id, existingToken.id));
  }

  const veriFicationToken = await db
    .insert(emailVerificationToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return veriFicationToken;
};

//email confirmation
export const emailConfirmWithToken = async (token: string) => {
  const existingToken = await checkEmailValidationToken(null, token);
  if (!existingToken) return { error: "Invalid token" };

  const isExpired = new Date() > new Date(existingToken.expires);
  if (isExpired) return { error: "Token expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });
  if (!existingUser) return { error: "User is not found" };

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existingToken.email,
    })
    .where(eq(users.id, existingUser.id));

  await db
    .delete(emailVerificationToken)
    .where(eq(emailVerificationToken.id, existingToken.id));

  return { success: "Email verification is successfully done" };
};

//reset password token

const checkResetPasswordToken = async (email: string) => {
  try {
    const passwordResetToken = await db.query.resetPasswordToken.findFirst({
      where: eq(resetPasswordToken.email, email),
    });
    return passwordResetToken;
  } catch (err) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 30 * 60 * 1000);
  const existingToken = await checkResetPasswordToken(email);
  if (existingToken) {
    await db
      .delete(resetPasswordToken)
      .where(eq(resetPasswordToken.id, existingToken.id));
  }

  const passwordResetToken = await db
    .insert(resetPasswordToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return passwordResetToken;
};

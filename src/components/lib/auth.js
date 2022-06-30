import { compare, hash } from "bcryptjs";
import { getSession } from "next-auth/react";

export const hashPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashedPassword) =>
  await compare(password, hashedPassword);

export const getSessionAuth = async (options) => {
  const session = await getSession(options);

  return session | null;
};

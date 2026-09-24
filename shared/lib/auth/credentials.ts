import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";

interface Credentials {
  email: string;
  password: string;
}

export async function validateCredentials({ email, password }: Credentials) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    return null;
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
}

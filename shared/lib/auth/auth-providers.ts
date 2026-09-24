import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers/index";
import { compare } from "bcrypt";

import { prisma } from "@/prisma/prisma-client";

export const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),

  GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),

  CredentialsProvider({
    name: "Credentials",

    credentials: {
      email: {
        label: "E-Mail",
        type: "email",
      },
      password: {
        label: "Пароль",
        type: "password",
      },
    },

    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });

      if (!user || !user.password) {
        return null;
      }

      const isPasswordValid = await compare(
        credentials.password,
        user.password,
      );

      if (!isPasswordValid) {
        return null;
      }

      return {
        id: String(user.id),
        name: user.fullName,
        email: user.email,
        role: user.role,
      };
    },
  }),
];

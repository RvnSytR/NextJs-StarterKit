/* eslint-disable @typescript-eslint/no-empty-object-type */
import Credentials from "next-auth/providers/credentials";
import NextAuth, { DefaultSession, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

import { Role } from "./db/schema";
import { state } from "./db/state";

type AuthCredentials = {
  id_user: string;
  email: string;
  username: string;
  role: Role;
  log: Date;
  createdAt: Date;
};

// * Module Augmentation
declare module "next-auth" {
  interface User extends AuthCredentials {}

  interface Session {
    user: DefaultSession["user"] & AuthCredentials;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends AuthCredentials {}
}

// * Config
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 2592000 },
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        if (!credentials?.email) throw new Error("Email is required");
        const [res] = await state.user.getByEmail.execute({
          email: credentials.email as string,
        });
        if (!res) throw new Error("User does not exist!");
        return { ...res };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await state.user.updateLog.execute({ id_user: user.id_user });
      return true;
    },

    jwt({ token, user }): JWT | null {
      if (user) {
        const { id_user, username, email, role, log, createdAt } = user;
        token.id_user = id_user;
        token.username = username;
        token.email = email;
        token.role = role;
        token.log = log;
        token.createdAt = createdAt;
      }
      return token;
    },

    session({ session, token }): Session | DefaultSession {
      if (token && token.email) {
        const { id_user, username, email, role, log, createdAt } = token;
        session.user.id_user = id_user;
        session.user.username = username;
        session.user.email = email;
        session.user.role = role;
        session.user.log = log;
        session.user.createdAt = createdAt;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

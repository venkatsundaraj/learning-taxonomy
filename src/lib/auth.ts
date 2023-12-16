import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import { env } from "./env.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { Client } from "postmark";
import { siteConfig } from "@/config/site";

const client = new Client(env.POSTMARK_API_TOKEN);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    EmailProvider({
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ url, provider, identifier }) => {
        console.log(url, provider, identifier);
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        });

        const templetId = user?.emailVerified
          ? env.POSTMARK_ACTIVATION_TEMPLATE
          : env.POSTMARK_SIGN_IN_TEMPLATE;

        if (!templetId) {
          throw new Error("TempletId is missing");
        }

        const result = await client.sendEmailWithTemplate({
          TemplateId: parseInt(templetId),
          To: identifier,
          From: provider.from as string,
          TemplateModel: {
            action_url: url,
            name: siteConfig.name,
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: "X-Entity-Ref-ID",
              Value: new Date().getTime() + "",
            },
          ],
        });
        console.log(result);
        if (result.ErrorCode) {
          throw new Error(result.Message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    redirect() {
      return "/dashboard";
    },
  },
};
// https://tx.shadcn.com/api/auth/callback/email?callbackUrl=https%3A%2F%2Ftx.shadcn.com%2Fdashboard&token=c2568a59247ce47a9f285923047bfdb0b3254069aeb1f5ae611de59d8040e3fd&email=venkateshsundar614%40gmail.com
// http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&token=e8b4e05ec11990bc7c1d5ac2b7e4f7178beff6ab3262c4e6bdd051fe5be59f8b&email=venkat123%40gmail.com

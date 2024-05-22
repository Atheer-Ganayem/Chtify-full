import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/connectDB";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import User from "@/models/User";
import { IUser } from "@/types/mongo-types";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          await connectDB();

          const user: IUser | null = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const isPwMatch = await bcrypt.compare(credentials.password, user.password);

          if (!isPwMatch) {
            return null;
          }

          return {
            email: user.email,
            name: user.name,
            id: user._id.toString(),
            avatar: user.avatar,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        session.user.avatar = token.avatar as string;
      }

      return session;
    },
    async jwt(params) {
      if (params.user) {
        params.token.id = params.user.id;
        params.token.avatar = params.user.avatar;
      }
      return params.token;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.authSecret,
  pages: {
    signIn: "/auth",
  },
};

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs';

export default NextAuth({
  //Configure JWT
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: {label: 'email', type: 'email', placeholder: 'email'},
            password: {label: 'password', type: 'password', placeholder: 'password'},
        },
        async authorize(credentials) {
            const client = await new PrismaClient()
            const users = await client.users.findMany({
                where: {
                    email: credentials?.email,
                }
            })
            if (!users){
                client.$disconnect
                throw new Error('No user found with the email');
            }

            const currentuser = users[0]
            //check hashed password with DB password
            if(!credentials?.password || !currentuser.password){
                client.$disconnect
                throw new Error('Please enter correct password')
            }
            const checkPassword = await compare(credentials.password, currentuser.password)
            //Incorrect password - send response
            if (!checkPassword){
                client.$disconnect
                throw new Error('Password doesnt match');
            }
            client.$disconnect
            return {email: users[0].email, name: users[0].name};
        },
    }),
    
  ],
});

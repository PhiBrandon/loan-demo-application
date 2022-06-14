// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();

  const email = req.body.email;
  // Get the user ID

  const users = await prisma.users.findMany({
    where: {
      email: email,
    },
  });

  if (req.method === "POST") {
    //Collect input
    console.log(req.body);
    const userId = users[0].id
    const data = req.body
    //Hash password

    const loanApplication = await prisma.loanapplications.create({
      data: {
        streetaddress: data.streetaddress,
        propertytype: data.property,
        creditscore: data.creditscore,
        postalcode: data.postalcode,
        propertyuse: data.propertyuse,
        city:data.city,
        id:data.id,
        appliedat:data.appliedat,
        userid: userId,
        status: "pending",
        type: data.type,
      }
    })

    //Send success response
    res.status(201).json({ message: "Application Added", ...loanApplication });
    prisma.$disconnect();
  } else {
    res.status(500).json({ message: "Route not valid" });
  }
}

import { PrismaClient } from "@prisma/client";
import { useSession, signOut } from "next-auth/react";

export default async function LoanPage() {
    const loanData = [

        {
            AppliedAt: "3/14/22",
            InterestRate: 0.35,
            LoanProvider: "Mountain America",
            AmountDue: 9354.53,
            Status: "pending"

        }, {
            AppliedAt: "3/14/22",
            InterestRate: 0.35,
            LoanProvider: "Ocktank America",
            AmountDue: 9354.53,

        }, {
            AppliedAt: "3/14/22",
            InterestRate: 0.35,
            LoanProvider: "Bank of America",
            AmountDue: 9354.53,

        }, {
            AppliedAt: "3/14/22",
            InterestRate: 0.35,
            LoanProvider: "All American",
            AmountDue: 9354.53,

        }]
    const { data: session, status: isLoading } = useSession();
    const prisma = new PrismaClient()
    const currentEmail = session?.user?.email
    const getUser = await prisma.users.findMany(
        {
            where: {
                email: currentEmail ? currentEmail : "thedefinedone@gmail.com",
            },
        }
    )

    const getLoans = await prisma.loanapplications.findMany({
        where: {
            userid: getUser[0].id,
        }
    })
    return (
        <>
            <div className="flex max-w justify-between p-5 mx-10">
                {getLoans.map((loan) => (
                    <div className="py-7 px-12 border-2 rounded-2xl ">
                        <p>Loan Status: {loan.status}</p>
                        <p>{loan.userid}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mx-10">
                <button className="py-5 px-10 border-2 rounded-2xl ">Apply</button>
            </div>
        </>
    )
}
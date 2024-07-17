import mydb from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async () => {
 const allEmployee = await mydb`SELECT * FROM Employee`;
 return NextResponse.json(allEmployee)
};
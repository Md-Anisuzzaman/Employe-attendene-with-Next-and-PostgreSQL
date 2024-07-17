import mydb from "@/config/db";
import { connect } from "@/server";
import { NextResponse } from "next/server";

export const POST = async (req,res) => {
  const {name, email, address, password} = await req.json()
  await connect()
    const newUser = await mydb`
    INSERT INTO Employee (name,email,address,password)
    VALUES (${name},${email},${address},crypt(${password},gen_salt('bf'))) RETURNING *
    `;
    return NextResponse.json(newUser[0]);
};

import mydb from "@/config/db";
import { connect } from "@/server";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    const formData = await req.formData();
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    const { departmentName } = data
    const newUser = await mydb`
    INSERT INTO Department (departmentName)
    VALUES (${departmentName}) RETURNING *
    `;
    return NextResponse.json(newUser[0]);
};

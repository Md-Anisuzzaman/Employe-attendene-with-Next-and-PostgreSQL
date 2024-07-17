import mydb from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const result = await mydb`SELECT * FROM Users`;
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(error.message)
    }
};


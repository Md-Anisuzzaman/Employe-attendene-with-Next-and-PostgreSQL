import mydb from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const allDepartments = await mydb`SELECT * FROM Department`;
        return NextResponse.json({ departments: "All Department Lists", departments_lists: allDepartments });
    } catch (error) {
        console.error('Error fetching Departemnts:', error);
        return NextResponse.json(error.message)
    }
};


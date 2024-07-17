import mydb from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const { id } = await res.params;
    try {
        const department = await mydb`SELECT * FROM Department WHERE departmentID = ${id}`;
        return NextResponse.json({ deartment: department[0] });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(error.message);
    }
};

export const PUT = async (req, res) => {
    const { id } = await res.params;
    const data = {};
    const formData = await req.formData();
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    const {departmentName} = data

    try {
        const user = await mydb` UPDATE Department 
        SET departmentName = ${departmentName},
        updatedAt = CURRENT_TIMESTAMP
        WHERE departmentID = ${id} 
        RETURNING *`;
        return NextResponse.json({ msg: "updated succesfully", data: user });
    } catch (error) {
        console.error('Error updating Department:', error);
        return NextResponse.json(error.message);
    }
};

export const DELETE = async (req, res) => {
    const { id } = await res.params;
    try {
        const isMatch = await mydb`SELECT * FROM Department WHERE departmentID = ${id}`
        if (isMatch.length === 1) {
            const department = await mydb`DELETE FROM Department WHERE departmentID = ${id}`;
            return NextResponse.json({ msg: "Deleted successfully" });
        }
        else {
            return NextResponse.json({ msg: "Requested data not exists" })
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(error.message);
    }
};
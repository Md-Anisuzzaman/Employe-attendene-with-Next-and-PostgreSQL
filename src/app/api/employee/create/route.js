import mydb from "@/config/db";
import { connect } from "@/server";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  const { name, email, address, password, mobileNumber, departmentID } = data
  console.log(name, email, address, password, mobileNumber, departmentID);
  const departmentIntID = parseInt(departmentID, 10);
  try {
    const newUser = await mydb`
  INSERT INTO Employee (name,email,address,password,mobileNumber,departmentID)
  VALUES (${name},${email},${address},crypt(${password},gen_salt('bf')),${mobileNumber},${departmentIntID}) RETURNING *
  `;
    return NextResponse.json(newUser[0]);
  } catch (error) {
    return NextResponse.json(error.message);
  }
};

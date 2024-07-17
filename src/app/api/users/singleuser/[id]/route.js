import mydb from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const { id } = await res.params;
  try {
    const user = await mydb`SELECT * FROM Users WHERE usersid = ${id}`;
    return NextResponse.json(user[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(error.message);
  }
};

export const PUT = async (req, res) => {
  const { id } = await res.params;

  const formData = await req.formData();
  // const name = formData.get('name');
  // const address = formData.get('address');
  // const password = formData.get('password');
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  const { name, address, password } = data

  try {
    const user = await mydb` UPDATE Users 
        SET name = ${name}, address = ${address}, password = crypt(${password},gen_salt('bf'))
        WHERE UsersID = ${id} 
        RETURNING *`;
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(error.message);
  }
};

export const DELETE = async (req, res) => {
  const { id } = await res.params;
  try {
    const isMatch = await mydb`SELECT * FROM USERS WHERE usersid = ${id}`
    if (isMatch.length === 1){
      const user = await mydb`DELETE FROM Users WHERE usersid = ${id}`;
      return NextResponse.json({msg:"Deleted successfully"});
    }
    else{
      return NextResponse.json({msg:"Requested data not exists"})
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(error.message);
  }
};
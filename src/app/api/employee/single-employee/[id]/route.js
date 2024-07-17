import mydb from "@/config/db";
import { NextResponse } from "next/server";

// export const GET = async (req, res) => {
//   const { id } = await res.params;
//   try {
//     const employee = await mydb`SELECT * FROM Employee WHERE employeeID = ${id}`;

//     return NextResponse.json({employee:employee[0]});
//   } catch (error) {
//     console.error('Error fetching employee:', error);
//     return NextResponse.json(error.message);
//   }
// };

export const PUT = async (req, res) => {
  const { id } = await res.params;

  const formData = await req.formData();
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  const {name} = data

  try {
    const employee = await mydb` UPDATE Employee 
        SET name = ${name}
        WHERE employeeID = ${id} 
        RETURNING *`;
    return NextResponse.json(employee);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(error.message);
  }
};

export const DELETE = async (req, res) => {
  const { id } = await res.params;
  try {
    const isMatch = await mydb`SELECT * FROM Employee WHERE employeeID = ${id}`
    if (isMatch.length === 1) {
      const employee = await mydb`DELETE FROM Employee WHERE employeeID = ${id}`;
      return NextResponse.json({ msg: "Deleted successfully" });
    }
    else {
      return NextResponse.json({ msg: "Requested data not exists" })
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json(error.message);
  }
};


export const GET = async (req, res) => {
  const { id } = res.params;

  try {
    // Connect to the database


    // Query the database to get the employee and department details
    const result = await mydb`
    SELECT 
      e.employeeID, 
      e.uid, 
      e.name, 
      e.email, 
      e.address, 
      e.mobileNumber, 
      e.createdAt, 
      e.updatedAt,
      json_build_object(
        'departmentID', d.departmentID, 
        'departmentName', d.departmentName, 
        'createdAt', d.createdAt, 
        'updatedAt', d.updatedAt
      ) AS department
    FROM 
      Employee e
    LEFT JOIN 
      Department d 
    ON 
      e.departmentID = d.departmentID 
    WHERE 
      e.employeeID = ${id};
    `;

    if (result.length === 0) {
      return NextResponse.json({ msg: "Employee not found" });
    } else {
      return NextResponse.json(result[0]);
    }
  } catch (error) {
    console.error('Error fetching employee:', error);
    return NextResponse.json({ error: error.message });
  }
};

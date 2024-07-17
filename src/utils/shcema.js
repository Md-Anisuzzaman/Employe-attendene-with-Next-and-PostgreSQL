const createEmployeeTableSQL = `
    CREATE TABLE IF NOT EXISTS Employee (
        employeeID SERIAL PRIMARY KEY,
        uid INT UNIQUE DEFAULT (floor(random() * (9999 - 1000 + 1) + 1000)::int),
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        password VARCHAR(100) NOT NULL UNIQUE,
        mobileNumber VARCHAR(15) NOT NULL,
        departmentID INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_department
            FOREIGN KEY(departmentID) 
            REFERENCES Department(departmentID)
    );
`;


const createDepartmentTableSQL = `
    CREATE TABLE IF NOT EXISTS Department (
        departmentID SERIAL PRIMARY KEY,
        departmentName VARCHAR(50) NOT NULL UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

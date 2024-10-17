import db from "../config/db.js";

export const studentList = async (req, res) => {
  try {
    const data = await db.query("SELECT * from students");
    if (data[0].length === 0) {
      return res.status(404).send({
        message: "No students found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Students fetched successfully",
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in get all students",
      success: false,
      error,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    // This approach is vulnerable to SQL injection attacks. If the id variable comes from user input,
    //  an attacker could manipulate it to execute arbitrary SQL commands.
    // const data = await db.query(`SELECT * FROM students WHERE id =`+id);

    const data = await db.query(`SELECT * FROM students WHERE id =?`, [id]);
    console.log(data);
    if (data[0].length === 0) {
      return res.status(404).send({
        message: "Student not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Student found",
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in getting a particular student",
      success: false,
      error,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    // because class is a reserved keyword
    const { name, roll_no, fees, class: className, medium } = req.body;

    console.log(name, roll_no, fees, className, medium);

    if (!name || !roll_no || !fees || !className || !medium) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }

    const data = await db.query(
      `INSERT INTO students (name,fees,roll_no,class,medium) VALUES (?,?,?,?,?)`,
      [name, fees, roll_no, className, medium]
    );

    if (data[0].length === 0) {
      return res.status(400).send({
        message: "Error in creating student",
        success: false,
      });
    }

    return res.status(201).send({
      message: "Student created successfully",
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in createting a student",
      success: false,
      error,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, roll_no, fees, class: className, medium } = req.body;

    const data = await db.query(
      "UPDATE students SET name = ?,fees = ?,roll_no = ?,class = ?, medium = ? WHERE id = ?",
      [name, fees, roll_no, className, medium, id]
    );
    if (data[0].length === 0) {
      return res.status(400).send({
        message: "Error in updating student",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Student updated successfully",
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in updating a student",
      success: false,
      error,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await db.query("DELETE FROM students WHERE id = ?", [id]);

    return res.status(200).send({
      message: "Student deleted successfully",
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in deleting a student",
      success: false,
      error,
    });
  }
};

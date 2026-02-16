"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  course: string;
};

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [singleStudent, setSingleStudent] = useState<Student | null>(null);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  // 🔹 GET – All students
  async function fetchAllStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  // 🔹 GET – Student by ID
  async function fetchStudentById() {
    const res = await fetch(`/api/students?id=${studentId}`);

    if (!res.ok) {
      alert("Student not found");
      setSingleStudent(null);
      return;
    }

    const data = await res.json();
    setSingleStudent(data);
  }

  // 🔹 POST – Add student
  async function addStudent() {
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course })
    });

    setName("");
    setCourse("");
    fetchAllStudents();
  }

  // 🔹 PUT – Update student
  async function updateStudent() {
    await fetch("/api/students", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        name,
        course
      })
    });

    setEditId(null);
    setName("");
    setCourse("");
    fetchAllStudents();
  }

  // 🔹 DELETE – Delete student
  async function deleteStudent(id: number) {
    await fetch(`/api/students?id=${id}`, {
      method: "DELETE"
    });

    fetchAllStudents();
  }

  useEffect(() => {
    fetchAllStudents();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Management</h1>

      {/* 🔹 Add / Edit Form */}
      <h3>{editId ? "Edit Student" : "Add Student"}</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={e => setCourse(e.target.value)}
      />

      {editId ? (
        <button onClick={updateStudent}>Update</button>
      ) : (
        <button onClick={addStudent}>Add</button>
      )}

      <hr />

      {/* 🔹 Get Student By ID */}
      <h3>Search Student By ID</h3>

      <input
        placeholder="Student ID"
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
      />
      <button onClick={fetchStudentById}>Search</button>

      {singleStudent && (
        <p>
          {singleStudent.id} – {singleStudent.name} –{" "}
          {singleStudent.course}
        </p>
      )}

      <hr />

      {/* 🔹 Display All Students */}
      <h3>All Students</h3>

      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.id} – {student.name} – {student.course}

            <button
              style={{ marginLeft: 10 }}
              onClick={() => {
                setEditId(student.id);
                setName(student.name);
                setCourse(student.course);
              }}
            >
              Edit
            </button>

            <button
              style={{ marginLeft: 5 }}
              onClick={() => deleteStudent(student.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

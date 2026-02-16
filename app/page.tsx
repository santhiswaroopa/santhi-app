"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  name: string;
  course: string;
};

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [studentId, setStudentId] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // GET all students
  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  // ADD
  async function addStudent() {
    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course }),
    });
    setName("");
    setCourse("");
    fetchStudents();
  }

  // UPDATE
  async function updateStudent() {
    await fetch("/api/students", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editId, name, course }),
    });
    setEditId(null);
    setName("");
    setCourse("");
    fetchStudents();
  }

  // DELETE
  async function deleteStudent(id: number) {
    await fetch(`/api/students?id=${id}`, { method: "DELETE" });
    fetchStudents();
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="wrapper">
      <div className="card">
        <h1>Student Management</h1>

        {/* ADD */}
        <h2>{editId ? "Edit Student" : "Add Student"}</h2>
        <div className="row">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          {editId ? (
            <button className="btn primary" onClick={updateStudent}>
              Update
            </button>
          ) : (
            <button className="btn primary" onClick={addStudent}>
              Add
            </button>
          )}
        </div>

        {/* SEARCH */}
        <h2>Search Student By ID</h2>
        <div className="row">
          <input
            placeholder="ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button className="btn dark">Search</button>
        </div>

        {/* LIST */}
        <h2>All Students</h2>
        {students.map((s) => (
          <div className="student" key={s.id}>
            <span>
              {s.id} – {s.name} – {s.course}
            </span>
            <div>
              <button
                className="btn success"
                onClick={() => {
                  setEditId(s.id);
                  setName(s.name);
                  setCourse(s.course);
                }}
              >
                Edit
              </button>
              <button
                className="btn danger"
                onClick={() => deleteStudent(s.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

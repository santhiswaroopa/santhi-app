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
  const [highlightId, setHighlightId] = useState<number | null>(null);

  // 🔹 GET all students
  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  // 🔹 ADD student
  async function addStudent() {
    if (!name || !course) return;

    await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course }),
    });

    setName("");
    setCourse("");
    fetchStudents();
  }

  // 🔹 UPDATE student
  async function updateStudent() {
    if (!editId) return;

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

  // 🔹 DELETE student
  async function deleteStudent(id: number) {
    await fetch(`/api/students?id=${id}`, {
      method: "DELETE",
    });

    fetchStudents();
  }

  // 🔹 SEARCH + HIGHLIGHT
  function searchStudentById() {
    const found = students.find(
      (s) => s.id === Number(studentId)
    );

    if (!found) {
      alert("Student not found");
      return;
    }

    setHighlightId(found.id);

    // auto remove highlight after 2 sec
    setTimeout(() => {
      setHighlightId(null);
    }, 2000);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="wrapper">
      <div className="card">
        <h1>Student Management</h1>

        {/* 🔹 ADD / EDIT */}
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

        {/* 🔹 SEARCH */}
        <h2>Search Student By ID</h2>
        <div className="row">
          <input
            placeholder="ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button className="btn dark" onClick={searchStudentById}>
            Search
          </button>
        </div>

        {/* 🔹 LIST */}
        <h2>All Students</h2>

        {students.map((s) => (
          <div
            key={s.id}
            className={`student ${
              highlightId === s.id ? "highlight" : ""
            }`}
          >
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

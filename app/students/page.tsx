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
  if (!studentId) return;

  const res = await fetch(`/api/students?id=${Number(studentId)}`);

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
  <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-2xl mt-10 mb-10">

    <h1 className="text-4xl font-bold text-center mb-10">
      Student Management
    </h1>

    {/* Add Student */}
    <h2 className="text-2xl font-semibold mb-4">
      {editId ? "Edit Student" : "Add Student"}
    </h2>

    <div className="flex gap-4 mb-8">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="flex-1 p-3 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={e => setCourse(e.target.value)}
        className="flex-1 p-3 border rounded-lg"
      />

      <button
        onClick={editId ? updateStudent : addStudent}
        className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition"
      >
        {editId ? "Update" : "Add"}
      </button>
    </div>

    {/* Search */}
    <h2 className="text-2xl font-semibold mb-4">
      Search Student By ID
    </h2>

    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
        className="flex-1 p-3 border rounded-lg"
      />

      <button
        onClick={fetchStudentById}
        className="bg-gray-700 text-white px-6 rounded-lg hover:bg-gray-800 transition"
      >
        Search
      </button>
    </div>

    {singleStudent && (
      <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg mb-6">
        {singleStudent.id} – {singleStudent.name} – {singleStudent.course}
      </div>
    )}

    {/* All Students */}
    <h2 className="text-2xl font-semibold mb-4">
      All Students
    </h2>

   <div className="space-y-4">
  {students.map((student, index) => (
    <div
      key={student.id}
      className="bg-gray-100 p-4 rounded-xl flex justify-between items-center"
    >
      <span>
        {index + 1} – {student.name} – {student.course}
      </span>


          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditId(student.id);
                setName(student.name);
                setCourse(student.course);
              }}
              className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
            >
              Edit
            </button>

            <button
              onClick={() => deleteStudent(student.id)}
              className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
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
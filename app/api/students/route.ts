let students = [
  { id: 1, name: "Ravi", course: "Python" },
  { id: 2, name: "Anil", course: "AI" }
];

// ✅ GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const student = students.find(s => s.id === Number(id));
    if (!student) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }
    return Response.json(student);
  }

  return Response.json(students);
}

// ✅ POST
export async function POST(req: Request) {
  const body = await req.json();

  const newStudent = {
    id: students.length + 1,
    name: body.name,
    course: body.course
  };

  students.push(newStudent);
  return Response.json(newStudent, { status: 201 });
}

// ✅ PUT (UPDATE)
export async function PUT(req: Request) {
  const body = await req.json();

  const index = students.findIndex(
    s => s.id === body.id
  );

  if (index === -1) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  students[index] = {
    ...students[index],
    name: body.name,
    course: body.course
  };

  return Response.json(students[index]);
}

// ✅ DELETE
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  students = students.filter(
    s => s.id !== Number(id)
  );

  return Response.json({ message: "Deleted" });
}

import db from "@/lib/db";

/* ======================
   GET → SELECT
====================== */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const [rows]: any = await db.query(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return Response.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return Response.json(rows[0]);
  }

  const [rows] = await db.query(
    "SELECT * FROM employees"
  );

  return Response.json(rows);
}

/* ======================
   POST → INSERT
====================== */
export async function POST(req: Request) {
  const { name, salary } = await req.json();

  const [result]: any = await db.query(
    "INSERT INTO employees (name, salary) VALUES (?, ?)",
    [name, salary]
  );

  return Response.json(
    {
      id: result.insertId,
      name,
      salary
    },
    { status: 201 }
  );
}

/* ======================
   PUT → UPDATE
====================== */
export async function PUT(req: Request) {
  const { id, name, salary } = await req.json();

  const [result]: any = await db.query(
    "UPDATE employees SET name = ?, salary = ? WHERE id = ?",
    [name, salary, id]
  );

  if (result.affectedRows === 0) {
    return Response.json(
      { message: "Employee not found" },
      { status: 404 }
    );
  }

  return Response.json({ id, name, salary });
}

/* ======================
   DELETE → DELETE
====================== */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const [result]: any = await db.query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return Response.json(
      { message: "Employee not found" },
      { status: 404 }
    );
  }

  return Response.json({ message: "Deleted successfully" });
}

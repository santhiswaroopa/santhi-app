import Link from "next/link";

export default function Furniture() {
  return (
    <div>
      <h3>Furniture</h3>

      <ul>
        <li>
          <Link href="/dashboard/products/furniture/computer-tables">
            Computer Tables
          </Link>
        </li>
        <li>
          <Link href="/dashboard/products/furniture/dining-tables">
            Dining Tables
          </Link>
        </li>
      </ul>
    </div>
  );
}

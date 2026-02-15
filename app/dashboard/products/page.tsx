import Link from "next/link";

export default function Products() {
  return (
    <div>
      <h2>Products</h2>

      <ul>
        <li>
          <Link href="/dashboard/products/electronics">
            Electronics
          </Link>
        </li>
        <li>
          <Link href="/dashboard/products/furniture">
            Furniture
          </Link>
        </li>
      </ul>
    </div>
  );
}

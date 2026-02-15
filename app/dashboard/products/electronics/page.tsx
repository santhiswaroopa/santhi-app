import Link from "next/link";

export default function Electronics() {
  return (
    <div>
      <h3>Electronics</h3>

      <ul>
        <li>
          <Link href="/dashboard/products/electronics/tv">
            TV
          </Link>
        </li>
        <li>
          <Link href="/dashboard/products/electronics/mobile">
            Mobile
          </Link>
        </li>
      </ul>
    </div>
  );
}

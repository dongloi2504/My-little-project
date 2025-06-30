import { Link } from "react-router-dom";

export default function Breadcrumb({ category }) {
  const slug = category.toLowerCase().replace(/\s+/g, "-");

  return (
    <nav className="text-sm text-gray-600 px-6 py-3">
      <Link
        to="/"
        className="text-gray-600 hover:text-orange-500 hover:underline"
      >
        Trang chủ
      </Link>
      <span className="mx-1">/</span>
      <Link
        to={`/${slug}`}
        className="text-orange-500 font-medium hover:underline"
      >
        {category}
      </Link>
    </nav>
  );
}

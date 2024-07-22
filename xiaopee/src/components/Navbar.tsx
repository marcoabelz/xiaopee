import Search from "./Search";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";

export default function Navbar() {
  const authorizationCookie = cookies().get("Authorization");

  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-l ml-4">
            Xiaopee
          </Link>
          <Link style={{ textDecoration: "none" }} href="/" className={"btn btn-ghost text-l ml-4"}>
            Home
          </Link>
          <Link style={{ textDecoration: "none" }} href="/products" className={"btn btn-ghost text-l ml-4"}>
            Products
          </Link>
          <Link style={{ textDecoration: "none" }} href="/wishlist" className={"btn btn-ghost text-l ml-4"}>
            Wishlist
          </Link>
        </div>
        <div className="flex-none">
          {/* <Search /> */}
          <div className="dropdown dropdown-end">
            {authorizationCookie ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className="btn btn-ghost text-l">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

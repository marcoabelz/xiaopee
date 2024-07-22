import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LogoutButton() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          cookies().delete("Authorization");
          redirect("/login");
        }}
      >
        <button className="text-red-500 btn btn-ghost text-l" type="submit">
          Logout
        </button>
      </form>
    </>
  );
}

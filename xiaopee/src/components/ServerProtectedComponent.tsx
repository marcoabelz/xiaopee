import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ServerProtectedComponent({ children }: { children: React.ReactNode }) {
  const authorizationCookie = cookies().get("Authorization");
  if (!authorizationCookie) {
    return redirect("/login");
  }
  return children;
}

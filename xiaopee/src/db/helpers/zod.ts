import { ZodError } from "zod";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

export function formatZodError(error: ZodError) {

  const errPath = error.errors[0].path[0];
  const errMessage = error.errors[0].message;

  // return redirect(`/login?error=${errMessage}`);

  return `${errPath} ${errMessage.toLocaleLowerCase()}`;
}

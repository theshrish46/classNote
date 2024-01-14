import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth-actions/logout";

export const LogOutButton = () => {
  return (
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

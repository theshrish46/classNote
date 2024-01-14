import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";

export const LogOutButton = () => {
  return (
    <form action={logout}>
      <Button type="submit">Logout</Button>
    </form>
  );
};

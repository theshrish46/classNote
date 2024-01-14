import { signOut } from "@/auth";
import { Button } from "../ui/button";

export const LogOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Logout</Button>
    </form>
  );
};

"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOut() {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="cursor-pointer"
    >
      Sign out
    </Button>
  );
}

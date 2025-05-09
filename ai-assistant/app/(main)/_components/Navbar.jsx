import { UserButton } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Image src={"/logo.svg"} alt="Logo" width={200} height={200} />
      <UserButton />
    </div>
  );
}

export default Navbar;

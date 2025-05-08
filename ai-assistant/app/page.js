import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>AI assistant</h1>
      <Button variant={"destructive"}>Click me</Button>
      <UserButton />
    </div>
  );
}

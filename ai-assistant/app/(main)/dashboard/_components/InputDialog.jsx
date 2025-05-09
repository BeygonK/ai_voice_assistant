import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { coachingExperts } from "@/utils/List";
import Image from "next/image";

function InputDialog({ children, itemOptions }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{itemOptions.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3">
                <h2 className="text-black">
                  Enter topic to learn in {itemOptions.name}
                </h2>
                <Textarea placeholder="" className="mt-2" />
                <div>
                  {coachingExperts.map((expert) => {
                    return (
                      <Image
                        src={expert.avatar}
                        alt={expert.name}
                        width={100}
                        height={100}
                        key={expert.id}
                      />
                    );
                  })}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InputDialog;

import React, { use, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { coachingExperts } from "@/utils/List";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

function InputDialog({ children, itemOptions }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const CreateContentRoom = useMutation(api.contentRoom.CreateContentRoom);
  const [openDialog, setOpenDialog] = useState(false);

  const onClickNext = async () => {
    const res = await CreateContentRoom({
      topicOption: itemOptions.name,
      tutor: selectedOption,
      topic: inputValue,
    });
    setOpenDialog(false);
  };
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{itemOptions.name}</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3">
                <h2 className="text-black">
                  Enter topic to learn in {itemOptions.name}
                </h2>
                <Textarea
                  placeholder=""
                  className="mt-2"
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <h2 className="text-black mt-5">Choose your tutor</h2>
                <div className="grid grid-cols-3 md:grid-cols-5 mt-3 gap-3">
                  {coachingExperts.map((expert, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedOption(expert.name)}
                        className={``}
                      >
                        <Image
                          src={expert.avatar}
                          alt={expert.name}
                          width={100}
                          height={100}
                          className={`rounded-lg object-cover w-[80px] h-[80px] cursor-pointer hover:scale-105 transition-all duration-200
                            ${selectedOption === expert.name && "border-4 border-red-500"}
                          `}
                        />
                        <h2 className="text-sm font-medium">{expert.name}</h2>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-end gap-5 items-center mt-5">
                  <DialogClose asChild>
                    <Button
                      variant={"destructive"}
                      className={"cursor-pointer"}
                    >
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    disabled={!inputValue || !selectedOption}
                    className={"cursor-pointer"}
                    onClick={onClickNext}
                  >
                    Next
                  </Button>
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

import { Session } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRoundPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfileCardProps = {
  session: Session;
};
const ProfileCard = ({ session }: ProfileCardProps) => {
  return (
    <div className=" flex px-2 py-4 items-center justify-between w-full">
      <div className=" flex gap-2 items-center">
        <Avatar className="w-14 h-14 bg-primary">
          <AvatarImage src={session?.user?.image!} />
          <AvatarFallback className=" bg-primary text-white font-bold w-full h-full flex items-center justify-center">
            {session?.user?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3>{session?.user?.name}</h3>
          <h3>{session?.user?.email}</h3>
        </div>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <UserRoundPen className="w-5 h-5" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileCard;

import { VariantsWithImagesTags } from "@/lib/infer-types";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type VariantsDialogProps = {
  children: React.ReactNode;
  editMode: boolean;
  productId?: number;
  variantId?: VariantsWithImagesTags;
};

const VariantsDialog = ({
  children,
  editMode,
  productId,
  variantId,
}: VariantsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Variant" : "Add Variant"}</DialogTitle>
          <DialogDescription>Manage your variants</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VariantsDialog;

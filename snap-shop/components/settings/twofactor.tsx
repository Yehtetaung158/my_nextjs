import React from "react";
import SettingCard from "./settingCard";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

const TwoFactor = () => {
  return (
    <Card className=" flex items-center justify-between px-2 py-4 w-full">
      <div>TwoFactor</div>
      <p>
        {false ? (
          <Button className=" flex gap-2 justify-center items-center">
            <span>
              <Check className="w-4 h-4" />
            </span>
            Enable
          </Button>
        ) : (
          <Button className=" flex gap-2 items-center justify-center bg-red-500 text-white hover:bg-red-600">
            <span>
              <X className="w-4 h-4" />
            </span>
            Disable
          </Button>
        )}
      </p>
    </Card>
  );
};

export default TwoFactor;

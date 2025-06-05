import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { set } from "zod";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  sendEmailOTP,
  verifySecret,
} from "@/lib/appwrite/actions/user.actions";

type OTPModalProps = {
  email: string;
  accountId: string;
};
const OTPModal = ({ email, accountId }: OTPModalProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOTPSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) router.push("/");
    } catch (error) {
      console.error("Error submitting OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    await sendEmailOTP({ email });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center font-bold text-[#9a6efe]">
            Enter Your OTP
          </AlertDialogTitle>
          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={20}
            height={20}
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-2 rounded-xl p-1 bg-[#9a6efe]/50 cursor-pointer text-white"
          />
          <AlertDialogDescription className="subtitle-2 text-[14px] leading-[20px] font-semibold text-center text-gray-600">
            We&apos;ve sent a 6-digit OTP to your{" "}
            <span className="pl-1 text-violet-700 font-semibold">
              {email || ".@gmail.com"}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="shad-otp-input"
                />
              ))}
            </InputOTPGroup>
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
          <div className="w-full flex flex-col gap-4">
            <AlertDialogAction
              className="shad-submit-btn"
              type="button"
              onClick={handleOTPSubmit}
            >
              Continue
              {loading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>
            <div className="flex justify-center subtitle-2 items-center">
              Didn&apos;t receive OTP?
              <Button
                className="text-purple-500 hover:cursor-pointer font-semibold transition-all text-center body-2"
                type="button"
                variant="link"
                onClick={handleResendOTP}
              >
                Resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;

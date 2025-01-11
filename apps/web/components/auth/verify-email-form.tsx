"use client";

import { useVerifyEmail } from "@/hooks/auth/use-verify-email";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ImSpinner8 } from "react-icons/im";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

const VerifyEmailForm = () => {
  const { token }: { token: string } = useParams();
  const { isFetching, isSuccess, isError } = useVerifyEmail(token);

  if (isFetching) {
    return (
      <div className="mt-8 flex items-center justify-center">
        <ImSpinner8 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center">
        <LuCircleX className="w-12 h-12 text-red-500" />
        <p className="mt-4 text-center">
          It looks like your email verification link is either invalid or has
          expired.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <LuCircleCheck className="w-12 h-12 text-green-500" />
      <p className="mt-4 text-center">
        Thank you for verifying your email address! Your account is now fully
        activated, and you're all set to explore everything we have to offer.
      </p>
      <p className="text-center">
        <Link href="/login" className="text-primary hover:underline">
          Return to login
        </Link>
      </p>
    </div>
  );
};

export default VerifyEmailForm;

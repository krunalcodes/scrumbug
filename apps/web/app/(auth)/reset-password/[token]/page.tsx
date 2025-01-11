import ResetPasswordForm from "@/components/auth/reset-password-form";
import Link from "next/link";
import { SiJirasoftware } from "react-icons/si";

const ResetPassword = () => {
  return (
    <div className="bg-[url('/beams.jpg')] bg-no-repeat bg-cover flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-background max-w-md w-full shadow-md rounded-xl p-8">
        <Link
          href="/"
          className="flex items-center justify-center text-primary"
        >
          <SiJirasoftware className="w-10 h-10 mr-2" />
          <span className="font-bold text-3xl">Scrumbug</span>
        </Link>
        <h1 className="text-center font-semibold mt-8">
          Choose a new password
        </h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
import { nextAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await nextAuth.auth();
  if (session?.user) {
    return redirect("/");
  }

  return <>{children}</>;
}

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthGuard({ children } : any) {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  return status === 'authenticated' && children;
}

export default AuthGuard;

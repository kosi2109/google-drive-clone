import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { isLoggedIn } from "../../utils/auth";

function RouteGuard({ children }: any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/auth", "/auth/google"];
    const path = url.split("?")[0];
    setAuthorized(true);
    if (!isLoggedIn() && !publicPaths.includes(path)) {
      router.push({
        pathname: "/auth",
      });
    }

    if (isLoggedIn() && publicPaths.includes(path)) {
      router.push({
        pathname: "/drive/my-drive",
      });
    }
  }

  return authorized && children;
}

export default RouteGuard;

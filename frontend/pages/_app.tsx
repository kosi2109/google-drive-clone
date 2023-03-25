import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import ChunkedUploady from "@rpldy/chunked-uploady";
import { useEffect, useState } from "react";

const chunkSize = 10 * 1024 * 1024;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  //to prevent error in next 14
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <SessionProvider session={session}>
          <ChunkedUploady
            method="POST"
            destination={{
              url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/uploadLargeFiles`,
              headers: {
                Accept: "application/json",
              },
            }}
            chunkSize={chunkSize}
            inputFieldName={"file"}
          >
            <Component {...pageProps} />
          </ChunkedUploady>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}

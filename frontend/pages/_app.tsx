import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { ThemeProvider } from "next-themes";
import RouteGuard from "../components/auth/RouteGuard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class">
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </ThemeProvider>
    </Provider>
  );
}

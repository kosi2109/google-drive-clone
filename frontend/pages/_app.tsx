import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Header, SideBar, PageNavigator } from "../components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="h-screen overflow-hidden">
        <Header />
        <div className="flex">
          <div className="w-1/6 border-r">
            <SideBar />
          </div>
          <div className="w-5/6">
            <PageNavigator pageName="test" />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </Provider>
  );
}

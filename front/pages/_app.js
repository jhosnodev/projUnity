import "../styles/globals.css";
// import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  );
}

/* export default MyApp; */
export default wrapper.withRedux(MyApp);

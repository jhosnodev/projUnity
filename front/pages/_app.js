import "../styles/globals.css";
// import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* import "tailwindcss/tailwind.css"; */


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Component
          {...pageProps}
          className=" purple-dark text-foreground bg-background"
        />
        <ToastContainer />
      </NextUIProvider>
    </Provider>
  );
}

/* export default MyApp; */
export default wrapper.withRedux(MyApp);

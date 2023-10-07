import "../styles/globals.css";
// import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { ChakraProvider } from '@chakra-ui/react'
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

/* import "tailwindcss/tailwind.css"; */


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <ChakraProvider>
        <Component
          {...pageProps}
          className=" purple-dark text-foreground bg-background"
        />
        </ChakraProvider>
      </NextUIProvider>
    </Provider>
  );
}

/* export default MyApp; */
export default wrapper.withRedux(MyApp);

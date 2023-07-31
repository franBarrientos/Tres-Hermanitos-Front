import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./context/AppProvider.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import router from "./router.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const colors = {
  ly: {
    900: "#FAF3F0",
    800: "#F8E8EE",
    700: "#273453",
    600: "#F1D6AB",
    500: "#F8F8F8",
    400: '#FFE6C7',
    300:'#F2BED1'
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ChakraProvider theme={theme}>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

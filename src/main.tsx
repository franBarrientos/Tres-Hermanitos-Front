import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./context/AppProvider.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import router from "./router.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
      <ChakraProvider>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

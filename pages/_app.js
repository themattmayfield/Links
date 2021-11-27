import "../style.css";
import "react-grid-layout/css/styles.css";
import { AuthProvider } from "@/utils/auth";
import Providers from "@/utils/Providers";
import { ThemeProvider } from "@/utils/themeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Providers>
          <Component {...pageProps} />
          <ToastContainer />
        </Providers>
      </ThemeProvider>
    </AuthProvider>
  );
}

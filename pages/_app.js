import "../style.css";
import "react-grid-layout/css/styles.css";
import { AuthProvider } from "@/utils/auth";
import ThemeTypeProvider from "@/utils/Theme/ThemeTypeProvider";
import { ThemeProvider } from "@/utils/Theme/themeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ThemeTypeProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeTypeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

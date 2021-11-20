import "../style.css";
import "react-grid-layout/css/styles.css";
import { AuthProvider } from "@/utils/auth";
import { CardProvider } from "@/utils/cardContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JiggleProvider } from "@/utils/jiggleModeContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CardProvider>
        <JiggleProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </JiggleProvider>
      </CardProvider>
    </AuthProvider>
  );
}

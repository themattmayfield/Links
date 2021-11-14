import "../style.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { AuthProvider } from "@/utils/auth";
import { CardProvider } from "@/utils/cardContext";
import { ToastContainer } from "react-toastify";
import { JiggleProvider } from "@/utils/jiggleModeContext";
export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CardProvider>
        <JiggleProvider>
          <Component {...pageProps} />
        </JiggleProvider>
      </CardProvider>
    </AuthProvider>
  );
}

import Head from "next/head";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import { useAuth } from "@/utils/auth";
import Loading from "./Loading";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { user, loading, authUser } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }
  if (!authUser) {
    // router.push("/login");
    return true;
  }
  // console.log(authUser);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="flex flex-col sm:px-8 lg:px-0 py-2 sm:py-8 lg:py-14 w-full max-w-6xl mx-auto ">
        {children}
        {/* <Footer /> */}
      </main>
    </>
  );
}

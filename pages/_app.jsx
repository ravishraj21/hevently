import Navbar from "../components/Navbar/Navbar";
import { UserProvider } from "../context/Users";
import { ProfileProvider } from "../context/Profile";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";

import "tailwindcss/tailwind.css";
import "../styles/loader.css";
import "../styles/confirm.css";
import "../styles/global.css";

import "swiper/css/bundle";

function App({ Component, pageProps }) {
  const router = useRouter();
  const userPath = `/profile`;
  const hostPath = `/host`;
  const check = (userPath === router.pathname) || (hostPath === router.pathname);

  useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }, []);

  return (
    <>
      <UserProvider>
        <ProfileProvider>
          {check || <Navbar />}
          <Component {...pageProps} />
        </ProfileProvider>
      </UserProvider>
    </>
  );
}

export default App;

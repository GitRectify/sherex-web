import { useState, useEffect } from "react";

import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";

const Header = () => {
  const [show, setShow] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/") {
      setShow("block float-right pt-4 px-8");
    } else setShow("hidden");
  }, [window.location.pathname]);

  return (
    <>
      <MobileHeader />
      <MobileFooter />
    </>
  );
};

export default Header;

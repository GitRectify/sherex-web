import { useState } from "react";

import MobileNavbar from "./MobileNavbar";
import * as SVG from "../../common/Icons";

const MobileHeaderDropdownMenu = () => {
  const [clicked, setClicked] = useState(false);

  const showNav = () => {
    setClicked(!clicked);
  };

  return (
    <div
      className={`flex items-center p-2 rounded-full`}
      onClick={showNav}
    >
      <SVG.DropDown />
      <MobileNavbar show={clicked} />
    </div>
  );
};

export default MobileHeaderDropdownMenu;

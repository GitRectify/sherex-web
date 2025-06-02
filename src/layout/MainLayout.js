import React from "react";
import MainContentContainer from "../common/MainContentContainer";
import TopNavbar from "../components/navbar/TopNavbar";
import Header from "../components/header/Header";
import useMedia from "../common/mediaQuery";
import { background } from "../common/IMG/Images";
function MainLayout(props) {
  const { children } = props;
  const IsLarge = useMedia();
  const isActive = IsLarge.useIsLarge;

  return (
    <div className="relative w-full overflow-hidden min-h-screen h-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
      {isActive ? <TopNavbar /> : ""}
      <Header />
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
}

export default MainLayout;

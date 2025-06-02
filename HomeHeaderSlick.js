import Slider from "react-slick";
import useMedia from "../../common/mediaQuery";
import { DEXTFORCE, DEXTFORCE2, DEXTFORCE3, DEXTFORCE4, DEXTFORCE5, DEXTFORCE6, DEXTFORCE7, DEXTFORCE8, data } from "../../common/IMG/Images";
import { useEffect, useState, useRef } from "react";
const datas = [
  {
    id: 0,
    img: DEXTFORCE,
    txt1: "Private Sale and Pre-Sale: Ciphegis begins its mission by offering $CIPH tokens to early supporters who share the vision of a secure decentralized kingdom.",
    tx2: "Forming the Vanguard: The first defenders of the kingdom are gathered, ready to take on the role of auditing and securing blockchain projects."
  },
  {
    id: 1,
    img: DEXTFORCE2,
    txt1: "Public Sale and Exchange Listings: The kingdom opens its treasury to the public, allowing all citizens to acquire $CIPH tokens and join the mission.",
    tx2: "Platform Launch: Ciphegis unveils its decentralized auditing platform, enabling the community to actively participate in securing blockchain projects and fortifying the kingdom’s defenses."
  },
  {
    id: 2,
    img: DEXTFORCE3,
    txt1: "Strategic Alliances: Ciphegis forges partnerships with global leaders in blockchain security and auditing, strengthening the kingdom’s influence and resources.",
    tx2: "Knowledge Empowerment: Ciphegis launches training programs and workshops to equip its citizens with the knowledge and skills needed to defend the kingdom."
  },
  {
    id: 3,
    img: DEXTFORCE5,
    txt1: "Bug Bounty Marketplace Launch: Ciphegis establishes a decentralized marketplace where citizens are rewarded for identifying and resolving vulnerabilities. This ensures that the kingdom’s security is an ongoing, collaborative effort.",
  },
]
const HomeHeaderSlick = () => {
  const media = useMedia();
  const isLarge = media.useIsLarge;
  const isXLarge = media.useXlLarge;
  const isSmall = media.useIsSmall;
  const [showNumber, setShowNumber] = useState(2);
  const sliderRef = useRef(null);

  useEffect(() => {
    { isXLarge ? setShowNumber(4) : isLarge ? setShowNumber(3) : isSmall ? setShowNumber(2) : setShowNumber(1) }
  }, [isXLarge, isLarge, isSmall]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: showNumber,
    slidesToScroll: 1
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      <div className="w-full overflow-auto mb-4 relative">
        <div className="absolute top-4 flex justify-center items-center w-full h-1 bg-[#0AF9FF] z-10"></div>
        <Slider
          ref={sliderRef}
          arrows={false}
          {...settings}>
          {datas.map((item, idx) => {
            return (
              <div
                key={idx}
                className=" cursor-pointer ">
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 bg-[#0AF9FF] rounded-full mt-2"></div>
                </div>
                <div className="flex flex-col items-start pt-2 sm:px-4 px-10">
                  <p className="text-sm text-white">
                    {item.txt1}
                  </p>
                  <p className="text-sm  text-white">
                    {item.tx2}
                  </p>
                </div>
              </div>
            )
          })}
        </Slider>
        <button onClick={previous} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">{"<"}</button>
        <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">{">"}</button>
      </div>
    </>
  )
}
export default HomeHeaderSlick;
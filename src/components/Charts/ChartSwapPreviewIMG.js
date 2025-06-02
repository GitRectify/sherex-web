import * as SVG from "../../common/Icons";
import { useState } from "react";

const ChartSwapPreviewIMG = (props) => {
  const item = props.item;
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isMouseClicked, setIsMouseClicked] = useState(false);
  const [color, setColor] = useState("red")
  const handleMouseEnter = () => setIsMouseEnter(true);
  const handleMouseLeave = () => setIsMouseEnter(false);
  const handleMouseClick = () => setIsMouseClicked(true);
  return (
    <>
      <div className="flex justify-start gap-4">
        <div
          onClick={handleMouseClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bg-[#88919e] rounded-full relative cursor-pointer">
          
          <img
            src={item}
            alt=""
            className="w-6 h-6 rounded-full" />
          {isMouseEnter && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SVG.Close color={color} />
          </div>)}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#88919e] text-xs font-medium">0 ADA</p>
          <div className="bg-[#88919e] h-[3px] w-[60px]"></div>
        </div>
      </div>
    </>


  )
}

export default ChartSwapPreviewIMG
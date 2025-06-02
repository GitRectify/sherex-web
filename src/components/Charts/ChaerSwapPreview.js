import * as SVG from "../../common/Icons";
import { useState } from "react";
import ChartSwapPreviewIMG from "./ChartSwapPreviewIMG";
import { ChartSwapImg1, ChartSwapImg2, ChartSwapImg3, ChartSwapImg4, ChartSwapImg5, ChartSwapImg6 } from "../../common/IMG/Images";
const ChartSwapPreview = (props) => {
  const isDetail = props.isDetail;
  const [color, setColor] = useState("yellow")
  const ImgData = [
    { ImgURL: ChartSwapImg1 },
    { ImgURL: ChartSwapImg2 },
    { ImgURL: ChartSwapImg3 },
    { ImgURL: ChartSwapImg4 },
    { ImgURL: ChartSwapImg5 },
    { ImgURL: ChartSwapImg6 },
  ]
  return (
    <div
      style={{
        "background": "transparent linear-gradient(180deg, #121218, #000) 0 0 no-repeat padding-box",
      }}
      className={`flex flex-col justify-between h-full w-full mr-10  rounded-2xl px-4 py-8 bg-[#121218] mt-4 `} >
      {/* chart position*/}
      <div className="flex flex-col gap-2 pr-6">
        {/* Swap Preview */}
        <div className="flex justify-between ">
          <p className={`text-white text-lg font-normal`}> Swap Preview</p>
          <div 
          onClick={() =>{
            props.handleDetail(isDetail)
          }}
          className="flex gap-2 cursor-pointer">
            <SVG.Close />
          </div>
        </div>
        {/* Sections */}
        <div className="flex justify-between  w-full">
          {/* section 1 */}
          <div className="flex flex-col justify-center items-start relative">
            <div className="flex justify-start">
              <p className="text-[#88919e] text-xs font-medium">Bonus Output</p>
            </div>
            <div className="flex justify-start">
              <p className="text-white text-base font-medium">Direct Swap</p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-[#88919e] text-xs font-medium">Other Deposits</p>
            </div>
            <div className="flex justify-start">
              <p className="text-white text-base font-medium tracking-wide">0 ADA</p>
            </div>
          </div>
          {/* section 2  */}
          <div className="flex flex-col justify-center items-start relative">
            <div className="flex justify-start">
              <p className="text-[#88919e] text-xs font-medium">Net price</p>
            </div>
            <div className="flex justify-start">
              <p className="text-white text-base font-medium">Direct 0 ADA</p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-[#88919e] text-xs font-medium">Batchers fees</p>
            </div>
            <div className="flex justify-start">
              <p className="text-white text-base font-medium tracking-wide">0 ADA</p>
            </div>
          </div>
          {/* section 3 */}
          <div className="flex flex-col justify-center items-start relative">
            <div className="flex justify-start">
              <p className="text-[#88919e] text-xs font-medium">Min. receive</p>
            </div>
            <div className="flex justify-start">
              <p className="text-white text-base font-medium">0 AGIX</p>
            </div>
            <div className="flex justify-start mt-4">
              <p className="text-[#88919e] text-xs font-medium">Frontend fee</p>
            </div>
            <div className="flex justify-start">
              <p className="text-white text-base font-medium tracking-wide">0 ADA</p>
            </div>
          </div>

        </div>
        <div className="py-2">
          <div className="bg-[#88919e] h-[1px] w-full"></div>
        </div>
        {/* Buttons */}
        <div className="flex gap-y-4 gap-x-24 flex-wrap">
          {ImgData.map((item, idx) => {
            return (
              <ChartSwapPreviewIMG key={idx} item={item.ImgURL} />)
          })}
        </div>
        {/* HIDE */}
        <div
          onClick={() =>{
            props.handleDetail(isDetail)
          }}
          className="flex justify-center gap-2 cursor-pointer">
          <span className="text-yellow-400 text-lg font-medium tracking-widest">HIDE  </span>
          <SVG.Down color={color} />
        </div>
      </div>
    </div>

  )
}

export default ChartSwapPreview
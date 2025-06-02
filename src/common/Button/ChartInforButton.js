import { useState } from "react";
import { getTokenLogo } from "../../utils";
const ChartInforButton = (props) => {
  const address = props.item.address;
  const ImgURL = getTokenLogo(address);
  const Letter = props.item.symbol;
  const idx = props.index

  return (
    <>
      <div
        onClick={() => props.handleItem(idx)}
        style={{
          "boxShadow": "0 1px 0 0 #030303, 0 2px 0 0 #262626",
        }}
        className={`flex items-center cursor-pointer x px-2 py-1 gap-1 hover:bg-[#24242c] `} >
        <img
          src={ImgURL}
          alt="ADA"
          className="w-5 h-5 cursor-pointer "
        />
        <p className="text-[12px] font-normal text-xs text-white  px-2 py-1">{Letter}</p>
      </div>
    </>
  )
}
export default ChartInforButton
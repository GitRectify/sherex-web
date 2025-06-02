import { useState } from "react";
import * as SVG from "../../common/Icons"
const Numbers = [
  { value: "0.5", active: false },
  { value: "1", active: false },
  { value: "2", active: false },
  { value: "5", active: false }]

const   ChartSwapSetting = (props) => {
  const isSetting = props.isSetting;
  const [move, setMove] = useState(false);
  const [move1, setMove1] = useState(false);
  const [move2, setMove2] = useState(false);
  const [move3, setMove3] = useState(false);
  const [numbers, setNumbers] = useState(Numbers);
  const handleButtonClick = (_idx) => {
    const newNumbers = Numbers.map((item, idx) => {
      if (idx === _idx)
        item.active = true;
      else
        item.active = false;
    })
    setNumbers(newNumbers);
  }
  const handleLearnMoreClick = () => {
    window.open("https://www.investopedia.com/", "_blank")
  }
  return (
    <div className="flex items-center h-full w-full justify-between rounded-2xl px-3 bg-black mt-10">
      {/* chart position*/}

      <div className="flex  p-3 w-full">
        <div className="flex flex-col gap-3 w-full">
          {/* setting name and icon */}
          <div className="flex justify-between">
            <div
              onClick={() => { props.handleSetting(isSetting) }}
              className="">
              <SVG.Close />
            </div>
            <p className="text-white text-lg font-normal">Settings</p>
            <div
              onClick={() => { props.handleSetting(isSetting) }}
              className=" cursor-pointer">
              <SVG.Setting />
            </div>
          </div>
          {/* Slippage tolerance */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-white text-base font-medium"> Slippage tolerance
              </p>
              <p
                style={{
                  "textDecorationColor": "#F59E0B " /* Replace with your desired color */

                }}
                onClick={handleLearnMoreClick}
                className="text-[#88919e] text-base font-normal underline hover:text-yellow-400 cursor-pointer">Learn more</p>
            </div>
            <div className="flex  items-center   pl-[20px] bg-[#141414] rounded-lg h-10 w-40 relative">
              <div
                onClick={() => setMove(true)}
                className={`w-1/2 text-sm  cursor-pointer z-30 ${move ? "text-black" : "text-[#88919e]"}`}>
                <p>AUTO</p>
              </div>
              <div
                onClick={() => setMove(false)}
                className={`w-1/2 m-auto text-sm text-[#88919e] cursor-pointer z-30 ${move ? "text-[#88919e]" : "text-black"}`}>
                <p>CUSTOM</p>
              </div>
              <div className={`absolute bg-gradient-to-r from-yellow-200 to-yellow-400 top-0 left-0 h-10 w-20 rounded-lg duration-200 ${move ? "translate-x-0 " : "translate-x-[80px]"}`}></div>
            </div>
          </div>
          {/* Numbers */}
          <div className="flex gap-3 justify-between">
            {Numbers.map((item, idx) => {
              return (<div
                key={idx}
                onClick={() => handleButtonClick(idx)}
                className="bg-[#121212] rounded-lg py-2 px-4 cursor-pointer">
                <p className={` text-base  ${item.active ? "text-yellow-400" : "text-white"}`}>{item.value}</p>
              </div>)

            })}
            <div
              className={`bg-[#121212] rounded-lg py-2 px-4 ${move ? "cursor-not-allowed" : ""}`}>
              <p className={` text-base  text-white`}>%</p>
            </div>
          </div>
          {/* Slippage Slippage */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-white text-base font-medium"> Unlimited Slippage
              </p>
              <p
                style={{
                  "textDecorationColor": "#F59E0B " /* Replace with your desired color */

                }}
                onClick={handleLearnMoreClick}
                className="text-[#88919e] text-base font-normal underline hover:text-yellow-400 cursor-pointer">Learn more</p>
            </div>
            <div className="flex gap-3  items-center   pl-[8px] bg-[#121212] rounded-lg h-10 w-20 relative">
              <div
                onClick={() => setMove1(true)}
                className={`w-1/2 text-sm  cursor-pointer z-30 ${move1 ? "text-black" : "text-[#88919e]"}`}>
                <p>OFF</p>
              </div>
              <div
                onClick={() => setMove1(false)}
                className={`w-1/2 m-auto text-sm text-[#88919e] cursor-pointer z-30 ${move1 ? "text-[#88919e]" : "text-black"}`}>
                <p>ON</p>
              </div>
              <div className={`absolute bg-gradient-to-r from-yellow-200 to-yellow-400 top-0 left-0 h-10 w-10 rounded-lg duration-200 ${move1 ? "translate-x-0 " : "translate-x-[40px]"}`}></div>
            </div>
          </div>
          {/* Automatic Slippage*/}
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-white text-base font-medium"> Automatic Slippage
              </p>
              <p
                style={{
                  "textDecorationColor": "#F59E0B " /* Replace with your desired color */

                }}
                onClick={handleLearnMoreClick}
                className="text-[#88919e] text-base font-normal underline hover:text-yellow-400 cursor-pointer">Learn more</p>
            </div>
            <div className="flex gap-3  items-center   pl-[8px] bg-[#121212] rounded-lg h-10 w-20 relative">
              <div
                onClick={() => setMove2(true)}
                className={`w-1/2 text-sm  cursor-pointer z-30 ${move2 ? "text-black" : "text-[#88919e]"}`}>
                <p>OFF</p>
              </div>
              <div
                onClick={() => setMove2(false)}
                className={`w-1/2 m-auto text-sm text-[#88919e] cursor-pointer z-30 ${move2 ? "text-[#88919e]" : "text-black"}`}>
                <p>ON</p>
              </div>
              <div className={`absolute bg-gradient-to-r from-yellow-200 to-yellow-400 top-0 left-0 h-10 w-10 rounded-lg duration-200 ${move2 ? "translate-x-0 " : "translate-x-[40px]"}`}></div>
            </div>
          </div>
          {/* Hunter X*/}
          <div className="flex justify-between items-center">
            <div className="flex flex-col flex-wrap">
              <div className="flex items-center gap-2">
                <SVG.HunterX />
                <p className="text-white text-base font-medium"> Hunter X
                </p>
              </div>
              <p className="text-[#88919e] text-base font-normal w-56">When available, aggregates liquidity sources for better prices and less fees.</p>
              <p
                style={{
                  "textDecorationColor": "#F59E0B " /* Replace with your desired color */

                }}
                onClick={handleLearnMoreClick}
                className="text-[#88919e] text-base font-normal underline hover:text-yellow-400 cursor-pointer ">Learn more</p>
            </div>
            <div className="flex gap-3  items-center   pl-[8px] bg-[#121212] rounded-lg h-10 w-20 relative">
              <div
                onClick={() => setMove3(true)}
                className={`w-1/2 text-sm  cursor-pointer z-30 ${move3 ? "text-black" : "text-[#88919e]"}`}>
                <p>OFF</p>
              </div>
              <div
                onClick={() => setMove3(false)}
                className={`w-1/2 m-auto text-sm text-[#88919e] cursor-pointer z-30 ${move3 ? "text-[#88919e]" : "text-black"}`}>
                <p>ON</p>
              </div>
              <div className={`absolute bg-gradient-to-r from-yellow-200 to-yellow-400 top-0 left-0 h-10 w-10 rounded-lg duration-200 ${move3 ? "translate-x-0 " : "translate-x-[40px]"}`}></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ChartSwapSetting
import { useState } from "react"
import ChartSwapHeader from "./ChaertSwapHeader";

const ChartSwap = () => {
  const handleSetting = () => {
    setIsSettingModal(true);
  }
  const [isSettingModal, setIsSettingModal] = useState(false);

  return (
    <>
      <div className="flex flex-col px-10 py-4 rounded-xl h-full border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
        <ChartSwapHeader isSetting="false" handleSetting={handleSetting} />
      </div>
    </>
  )
}

export default ChartSwap
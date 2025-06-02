import { useState } from "react"
import { getTokenLogo } from "../../../utils";
const LiquidityViewDetail = ({ pool }) => {
  const [isSetting, setIsSetting] = useState(false);
  const handleSetting = () => {
    setIsSetting(!isSetting);
  }
  return (
    <div className="flex flex-col w-full lg:max-w-[400px] px-6 py-4 rounded-xl min-h-[452px] relative border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
      <div className="mt-4">
        <p className=" text-white text-opacity-60">TVL</p>
        <p className=" text-white text-2xl font-semibold">${pool.liquidity?.toFixed(2)}</p>
        <p className=" text-[#FF5A5D] text-opacity-60 text-sm">-8.23%</p>
      </div>
      <div className="mt-4 space-y-3 rounded-xl border border-white border-opacity-20 py-2 px-3">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={`${getTokenLogo(pool.token0.id)}`} className="w-10 h-10 rounded-full" alt={pool.token0.symbol} />
            <p className="text-white ">{pool.token0.symbol}</p>
          </div>
          <p className="text-white ">{pool.totalValueLockedToken0}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={getTokenLogo(pool.token1.id)} className="w-10 h-10 rounded-full" alt={pool.token1.symbol} />
            <p className=" text-white">{pool.token1.symbol}</p>
          </div>
          <p className="text-white ">{pool.totalValueLockedToken1}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className=" text-white text-opacity-60">Volume 24H</p>
        <p className=" text-white text-2xl font-semibold">${pool.volume?.toFixed(2)}</p>
        <p className=" text-[#1AEFAF] text-opacity-60 text-sm">-8.23%</p>
      </div>
      <div className="mt-4">
        <p className=" text-white text-opacity-60">Fees 24H</p>
        <p className=" text-white text-2xl font-semibold">${pool.collectedFees?.toFixed(2)}</p>
      </div>
    </div >
  )
}

export default LiquidityViewDetail
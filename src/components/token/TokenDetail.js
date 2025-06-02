import { t } from "i18next"
import { useState } from "react"
const TokenView = (props) => {
  const {TVL, volumeH, volumeD, transaction} = props
  return (

    <div className="flex flex-col px-6 py-4 rounded-xl w-full  h-[450px] lg:max-w-[400px] border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
      <div className="mt-4">
        <p className=" text-white text-opacity-60">{t("tokenView.tvl")}</p>
        <p className=" text-white text-2xl font-semibold">${TVL}</p>
        <p className=" text-[#FF5A5D] text-opacity-60 text-sm">-8.23%</p>
      </div>
      <div className="mt-8">
        <p className=" text-white text-opacity-60">{t("tokenView.volume")}</p>
        <p className=" text-white text-2xl font-semibold">${volumeH}</p>
        <p className=" text-[#1AEFAF] text-opacity-60 text-sm">+8.23%</p>
      </div>
      <div className="mt-8">
        <p className=" text-white text-opacity-60">{t("tokenView.volume7d")}</p>
        <p className=" text-white text-2xl font-semibold">${volumeD}</p>
      </div>
      <div className="mt-8">
        <p className=" text-white text-opacity-60">{t("tokenView.transaction")}</p>
        <p className=" text-white text-2xl font-semibold">{transaction}</p>
      </div>
    </div >
  )
}

export default TokenView
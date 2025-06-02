import { useState } from "react";
import * as SVG from "../../common/Icons";
import ChartCardGroup from "./ChartCardGroup";
import ChartSwapPreview from "./ChaerSwapPreview";
import { useActions } from "../../hooks/useActions";
import { contractAddresses, WETH_ADDRESS } from "../../constants";
import { useTranslation } from "react-i18next";
import { formatUnits, parseUnits, toBigInt } from "ethers";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { staticTokens } from "../../constants";
import ClipLoader from "react-spinners/ClipLoader";
const ChartSwapHeader = (props) => {
  const isSetting = props.isSetting;
  const { info, setInfo, liquiditySlippage } = props;
  const [isSwapActive, setIsSwapActive] = useState(true);
  const [isLimitActive, setIsLimitActive] = useState(false);
  const [isRotate, setIsRoate] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [tokens, setTokens] = useLocalStorage('tokens', []);
  const [color, setColor] = useState("yellow");
  const [isDetail, setIsDetail] = useState(true)
  const { swap, approveToken, quote, depositWBNB } = useActions();
  const handleSwapClick = (swap) => {
    setIsSwapActive(true);
    setIsLimitActive(false);
  }
  const handleLimitClick = (swap) => {
    setIsSwapActive(false);
    setIsLimitActive(true);
  }
  const handlerRotate = () => {
    setIsRoate(!isRotate)
  }
  const handleDetail = (isDetail) => {
    setIsDetail(!isDetail);
  }

  const updateInfo = (newInfo) => {
    const { token0, token1, amount0, amount1 } = newInfo;
    setInfo(newInfo);
    if (!token0 || !token0.decimals || !token1 || !token1.decimals) return;
    const token0Amount = amount0 === 0? 0 : parseUnits(amount0.toString(), token0.decimals);
    quote(token0.address, token1.address, 2500, token0Amount).then((value) => {
      if (value) {
        const formattedAmount1 = formatUnits(value, token1.decimals);
        setInfo(prev => ({...prev, amount1: Number(formattedAmount1).toFixed(4)}));
      } else {
        setInfo(prev => ({...prev, amount1: 0}));
      }
    })
  }

  const handleSwap = async () => {
    const { token0, token1, amount0, amount1 } = info;
    setLoading(true);
    try {
      const token0Amount = parseUnits(amount0, token0.decimals);
      const token1Amount = parseUnits(amount1, token1.decimals);
      
      if (token0.address === WETH_ADDRESS.toLowerCase() && token0.isNative === true) {
        await depositWBNB(token0Amount);
      }

      await approveToken(token0.address, contractAddresses.swapRouter, token0Amount);
      await swap(token0.address, token1.address, 2500, token0Amount);
    }
    catch (error) {
      console.error('Swap failed:', error);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col w-full">
      {/* Swap and Limit */}
      {isDetail ? (
        <>
          <div className="flex justify-between items-center pl-4">
            <div className="flex gap-3">
              <p
                onClick={handleSwapClick}
                className={` text-xl font-normal cursor-pointer text-white`}>{t("swap.swap")}</p>
            </div>
            <div className="flex gap-3">
              <div
                className="flex gap-3  rounded-lg py-2 px-3 cursor-pointer">
                <div
                  onClick={props.handleSetting}
                  className=" cursor-pointer">
                  <SVG.Setting color={"white"} />
                </div>
              </div>
            </div>
          </div>
          <ChartCardGroup info={info} setInfo={updateInfo} tokens={tokens} />
        </>)
        : <ChartSwapPreview handleDetail={handleDetail} />}
      <div className="flex justify-between text-white my-4">
        <p>{t("swap.slippageTolerance")}</p>
        <p>{liquiditySlippage}%</p>
      </div>
      <div
        className="flex justify-center items-center bg-black bg-opacity-40 p-3 rounded-xl mt-4 cursor-pointer"
      >
        
          {loading ?
            <ClipLoader color="#F3BA2F"
                loading={loading}
                size={20}
                aria-label="Loading Spinner" 
            /> : <p className="text-base text-white" onClick={handleSwap}>{t("swap.enterAmount")}</p>}
        
      </div>    </div>
  )
}

export default ChartSwapHeader
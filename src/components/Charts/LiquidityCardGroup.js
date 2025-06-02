import { useState, useEffect } from "react";
import * as SVG from "../../common/Icons";
import { ADA } from "../../common/IMG/Images";
import { Verified } from "../../common/IMG/Images";
import { Tuna } from "../../common/IMG/Images";
import ChartInforButtons from "./ChartInforButtons";
import { useAppKitProvider, useAppKitAccount} from '@reown/appkit/react';
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import { WETH_ADDRESS } from "../../constants";
import { useTranslation } from 'react-i18next';

const LiquidityCardGroup = ({ info, setInfo, tokens }) => {
  const [isActiveDown, setIsActiveDown] = useState(false)
  const [token0Balance, setToken0Balance] = useState('0.00');
  const [token1Balance, setToken1Balance] = useState('0.00');
  const { t, i18n } = useTranslation();

  const { isConnected } = useAppKitAccount();
  const { getBalance, getNativeBalance } = useActions();

  const { tokens: tokensInfo } = useSelector((state) => state.tokens);
  const token0 = tokensInfo.filter((token, index) => token.id === info.token0.address);
  let token0Price = 0;
  if (token0.length > 0) {
    token0Price = token0[0].price;
  }

  const token1 = tokensInfo.filter((token, index) => token.id === info.token1.address);
  let token1Price = 0;
  if (token1.length > 0) {
    token1Price = token1[0].price;
  }

  const handleSwapDown = () => {
    setIsActiveDown(!isActiveDown);
  }
  
  const handleChangeAmount0 = (amount) => {
    setInfo(prev => ({ ...prev, amount0: amount }));
  }

  const handleChangeAmount1 = (amount) => {
    setInfo(prev => ({ ...prev, amount1: amount }));
  }

  const handleUseMax0 = () => {
    setInfo({ ...info, amount0: token0Balance });
  }

  const handleUseMax1 = () => {
    setInfo({ ...info, amount1: token1Balance });
  }

  useEffect(() => {
    const fetchBalances = async () => {
      let balance0;
      if (info.token0.address === WETH_ADDRESS.toLowerCase() && info.token0.isNative === true) {
        balance0 = await getNativeBalance();
      } else {
        balance0 = await getBalance(info.token0.address);        
      }
      let balance1;
      if (info.token1.address === WETH_ADDRESS.toLowerCase() && info.token1.isNative === true) {
        balance1 = await getNativeBalance();
      }
      else {
        balance1 = await getBalance(info.token1.address);
      }
      if (balance0 || balance1) {
        setToken0Balance(Number(balance0).toFixed(5));
        setToken1Balance(Number(balance1).toFixed(5));
      }
    }
    if (isConnected && info.token0 && info.token0.address && info.token1 && info.token1.address) {
      fetchBalances();
    }
  }, [info, isConnected])

  return (
    <>
      {/* Card Group */}
      <div className="relative flex flex-col gap-2 mt-5">
        <div
           style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
          className={`flex flex-col justify-between h-full w-full  rounded-2xl p-4 border border-white border-opacity-20 ${isActiveDown ? "order-2" : "order-1"}`} >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className={`text-white text-base font-medium`}> {t("swap.from")}</p>
              <button className={`text-white text-base font-medium`} onClick={handleUseMax0}>{t("swap.useMax")}</button>
            </div>
            <div className="flex justify-between  w-full">
              <div className="flex flex-col justify-start">
                <input
                  type="number"
                  value={info.amount0}
                  onChange={(e) => {
                    handleChangeAmount0(e.target.value)
                  }}
                  placeholder="0"
                  maxLength={12}
                  className="text-white text-left bg-transparent border-none focus:border-none text-[30px] w-[70%]   font-semibold" />
                  <div className="flex gap-4">
                    <p className="text-[#88919e] text-lg font-medium">-${token0Price * Number(info.amount0)}</p>
                  </div>
              </div>
              <div className="flex w-full justify-end">
                <ChartInforButtons info={info} setInfo={setInfo} pairFor={0} tokens={tokens}/>

              </div>
            </div>
            {/* Cardano */}
          </div>

        </div>
        {/* TUNA Content */}
        <div
           style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
          className={`flex flex-col justify-between h-full w-full mt-4 rounded-2xl p-4 border border-white border-opacity-20 ${isActiveDown ? "order-1" : "order-2"}`} >
          {/* chart position*/}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className={`text-white text-base font-medium`}> {t("swap.to")}</p>
              <button className={`text-white text-base font-medium`} onClick={handleUseMax1}>{t("swap.useMax")}</button>
            </div>
            {/* ADA */}
            <div className="flex justify-between  w-full">
              <div className="flex  justify-start flex-col">
                <input
                  type="number"
                  value={info.amount1}
                  onChange={(e) => {
                    handleChangeAmount1(e.target.value)
                  }}
                  placeholder="0"
                  maxLength={12}
                  className="text-white text-left bg-transparent border-none focus:border-none text-[30px] w-[70%]   font-semibold" />
                  <div className="flex gap-4">
                    <p className="text-[#88919e] text-lg font-medium">-${token1Price * Number(info.amount1)}</p>
                  </div>
              </div>
              <div className="flex w-full justify-end">
                <ChartInforButtons info={info} setInfo={setInfo} pairFor={1} tokens={tokens}/>

              </div>
            </div>
            {/* Cardano */}
          </div>

        </div>

      </div>
    </>
  )
}

export default LiquidityCardGroup
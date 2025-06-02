import { useEffect, useState } from "react";
import * as SVG from "../../common/Icons";
import { useTranslation } from 'react-i18next';
import ChartInforButtons from "./ChartInforButtons";
import { useActions } from "../../hooks/useActions";
import { useAppKitProvider, useAppKitAccount} from '@reown/appkit/react';
import { WETH_ADDRESS } from "../../constants";

const ChartCardGroup = ({ info, setInfo, tokens }) => {
  const [token0Balance, setToken0Balance] = useState('0.00');
  const [token1Balance, setToken1Balance] = useState('0.00');

  const { isConnected } = useAppKitAccount();
  const { getBalance, getNativeBalance } = useActions();

  const handleChangeAmount0 = (amount) => {
    setInfo({ ...info, amount0: amount });
  }

  const handleChangeAmount1 = (amount) => {
    setInfo({ ...info, amount1: amount });
  }
  const [isActiveDown, setIsActiveDown] = useState(false)
  const handleSwapDown = () => {
    setIsActiveDown(!isActiveDown);
    setInfo({ ...info, token0: info.token1, token1: info.token0, amount0: '0', amount1: '0' });
  }

  const handleUseMax = () => {
    setInfo({ ...info, amount0: token0Balance });
  }

  const { t, i18n } = useTranslation();

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
        {/* ADA Content */}
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
          className={`flex flex-col justify-between h-full w-full  rounded-2xl p-4  border border-opacity-20 border-white ${isActiveDown ? "order-2" : "order-1"}`} >
          {/* chart position*/}
          <div className="flex flex-col gap-2">
            {/* You Sell */}
            <div className="flex justify-between">
              <p className={`text-white text-base font-medium`}> {isActiveDown ? t("swap.to") : t("swap.from")}</p>
              {!isActiveDown && <button className={`text-white text-base font-medium`} onClick={handleUseMax}>{t("swap.useMax")}</button>}
            </div>
            {/* ADA */}
            <div className="flex justify-between  w-full">
              <div className="flex  justify-start w-full">
                <input
                  type="number"
                  value={info.amount0}
                  onChange={(e) => {
                    handleChangeAmount0(e.target.value)
                  }}
                  placeholder="0"
                  maxLength={12}
                  className={`text-white text-left bg-transparent border-none focus:border-none text-[30px] w-[70%] ${isActiveDown? 'hidden': ''} font-semibold`} />
                <div className={`text-white text-left bg-transparent border-none focus:border-none text-[30px] w-[70%] ${isActiveDown? '' : 'hidden'} font-semibold`}>{info.amount1}</div>
              </div>
              <div className="flex w-full justify-end">
                <ChartInforButtons info={info} setInfo={setInfo} pairFor={isActiveDown? 1 : 0} tokens={tokens} />

              </div>
            </div>
            {/* Cardano */}
            <div className="flex gap-4">
              <p className="text-white text-lg font-medium">{t("swap.balance")}</p>
              <p className="text-white text-lg font-medium">{isActiveDown? token1Balance : token0Balance}</p>
            </div>
          </div>

        </div>
        {/* TUNA Content */}
        <div
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
          }}
          className={`flex flex-col justify-between h-full w-full  rounded-2xl p-4 #121218] border border-white border-opacity-20 ${isActiveDown ? "order-1" : "order-2"}`} >
          {/* chart position*/}
          <div className="flex flex-col gap-2">
            {/* You Sell */}
            <div className="flex justify-between">
              <p className={`text-white text-base font-medium`}> {isActiveDown ? "From" : "To"}</p>
              {isActiveDown && <button className={`text-white text-base font-medium`} onClick={handleUseMax}>{t("swap.useMax")}</button>}
            </div>
            {/* ADA */}
            <div className="flex justify-between  w-full">
              <div className="flex  justify-start w-full">
                <input
                  type="number"
                  value={info.amount0}
                  onChange={(e) => {
                    handleChangeAmount0(e.target.value)
                  }}
                  placeholder="0"
                  maxLength={12}
                  className={`text-white text-left bg-transparent border-none focus:border-none text-[30px] w-[70%] ${isActiveDown? '': 'hidden'} font-semibold`} />
                <div className={`text-white text-left bg-transparent border-none focus:border-none text-[30px] w-[70%] ${isActiveDown? 'hidden' : ''} font-semibold`}>{info.amount1}</div>
              </div>
              <div className="flex w-full justify-end">
                <ChartInforButtons info={info} setInfo={setInfo} pairFor={isActiveDown? 0 : 1} tokens={tokens}/>

              </div>
            </div>
            {/* Cardano */}
            <div className="flex gap-4">
              <p className="text-white text-lg font-medium">{t("swap.balance")}</p>
              <p className="text-white text-lg font-medium">{isActiveDown? token0Balance : token1Balance}</p>
            </div>
          </div>

        </div>
        <div
          onClick={handleSwapDown}
          className="absolute top-[calc(45%)] sm:left-[calc(48%)] left-[calc(45%)] cursor-pointer"
        >
          <div
            style={{
              transform: isActiveDown ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <SVG.SwapDown />
          </div>
        </div>

      </div>
    </>
  )
}

export default ChartCardGroup
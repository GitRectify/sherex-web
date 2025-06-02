import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StakingSetting from "../Staking/setting";
import StakingChart from "../Staking/chart";
import SwapSettingModal from "../Charts/SwapSettingModal";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Swap = () => {
  // States for modal and settings
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [swapSlippage, setSwapSlippage] = useLocalStorage('swapSlippage', '0.5');
  const [liquiditySlippage, setLiquiditySlippage] = useLocalStorage('liquiditySlippage', '0.5');
  const [txDeadline, setTxDeadline] = useLocalStorage('txDeadline', '30');
  const dispatch = useDispatch();

  const { tokens } = useSelector((state) => state.tokens);
  const { swaps, loading: swapsLoading } = useSelector((state) => state.swaps);

  const [info, setInfo] = useState({
    token0: {
        address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
        isNative: true,
        logo: 'https://bscscan.com/token/images/bnbchain2_32.png'
    },
    token1: {
        address: "0x55d398326f99059ff775485246999027b3197955",
        name: "Tether USD",
        symbol: "USDT",
        decimals: 18,
        logo: 'https://bscscan.com/token/images/busdt_32.png'
    },
    amount0: 0,
    amount1: 0,
  })

  const handleSetting = () => {
    setIsSettingModal(true);  // This opens the modal
  };

  return (
    <div className="py-4 lg:w-[1290px] w-full h-full lg:pt-28 pt-16 pb-16 min-[1360px]:px-0 lg:px-8 px-4 flex lg:flex-row flex-col lg:gap-4 gap-10 relative">
      {
        swapsLoading? (
          <div className="flex justify-center items-center w-full h-[50vh]">
            <ClipLoader
                color="#F3BA2F"
                loading={swapsLoading}
                size={50}
                aria-label="Loading Spinner"
            />
          </div>
        ) : 
        (
          <>
            <StakingChart info={info} swaps = {swaps} />
            <StakingSetting
              info = {info}
              liquiditySlippage={liquiditySlippage}
              setInfo = {setInfo}
              handleSetting={handleSetting}
            />
            <SwapSettingModal
              isSettingModal={isSettingModal}
              setIsSettingModal={setIsSettingModal}
              swapSlippage={swapSlippage}
              setSwapSlippage={setSwapSlippage}
              liquiditySlippage={liquiditySlippage}
              setLiquiditySlippage={setLiquiditySlippage}
              txDeadline={txDeadline}
              setTxDeadline={setTxDeadline}
            />
          </>
        )
      }
      
    </div>
  );
};

export default Swap;
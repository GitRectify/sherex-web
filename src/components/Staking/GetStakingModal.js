import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ModalSetting from "../Modals/ModalSetting";
import SlippageSelectorSwap from "../Modals/SlippageSelectorSwap";
import { parseUnits } from "ethers";
import { useActions } from "../../hooks/useActions";
const calculateReturns = (apy, stakeAmount) => {
    // Convert inputs to numbers with validation
    const amount = parseFloat(stakeAmount) || 0;
    const rate = parseFloat(apy) || 0;
    // Calculate days and returns
    const days = Math.floor((rate / 100) * 365);
    const annualReturn = amount * (rate / 100);
    const estimatedReturn = amount + annualReturn;

    return {
        days,
        estimatedReturn: estimatedReturn.toFixed(2)
    };
};;
const GetStakingModal = ({ isOpen, onClose, pool }) => {
    const { t } = useTranslation();
    const [swapSlippage, setSwapSlippage] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);
    const { stake: stakeToPool } = useActions();

    // Only calculate returns if pool exists
    const { days, estimatedReturn } = pool ? calculateReturns(Number(swapSlippage), stakeAmount) : { days: 0, estimatedReturn: '0.00' };

    const formatCurrency = (amount) => {
        const value = parseFloat(amount) || 0;
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const handleStake = async () => {
        //console.log(swapSlippage);
        //console.log(stakeAmount);
        if (!stakeAmount || swapSlippage === 0) {
            return;
        }

        const apyIndex = pool.apys.findIndex(apy => apy === swapSlippage);
        const amount = parseUnits(stakeAmount, 18);
        const stake = await stakeToPool(pool.poolAddress, pool.stakingToken, amount, apyIndex);
        //console.log(stake);


    }

    return (
        <ModalSetting
            isOpen={isOpen}
            onClose={onClose}
            title=""
            isSmall={false}
        >
            {pool && ( // Only render modal content if pool exists
                <>
                    <div className="flex flex-col w-full border border-opacity-20 border-white rounded-xl px-4 py-2">
                        <p className="text-white text-lg text-center font-medium">{t("staking.returns")}</p>
                        <SlippageSelectorSwap
                            title=""
                            value={swapSlippage}
                            onChange={setSwapSlippage}
                            options={pool?.apys}
                        />
                        <div className="flex justify-between">
                            <p className="text-white ">{t("getStakingModal.looking")} {days} {t("getStakingModal.day")}</p>
                            <p className="text-white ">{t("getStakingModal.estimatedReturn")} {estimatedReturn} USDT</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full border border-opacity-20 border-white rounded-xl px-4 py-2 mt-4">
                        <div className="flex justify-between">
                            <p className="text-white ">{t("getStakingModal.stakeAmount")}</p>
                            <p className="text-white  ">{t("getStakingModal.max")}: 0</p>
                        </div>
                        <div className="flex flex-col w-full items-center gap-4 mt-2">
                            <input
                                type="number"
                                placeholder="0.00"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                className="w-full text-white px-4 py-2 rounded-lg bg-transparent border-none focus:border-none"
                            />
                            <div className="w-full -mt-1">
                                <p className="text-sm text-gray-400 text-left">-${formatCurrency(stakeAmount)}
                                </p>
                            </div>
                            <button
                                className="px-6 py-2 rounded-lg text-black hover:opacity-70 transition-opacity whitespace-nowrap w-[200px]"
                                style={{
                                    background: 'linear-gradient(to right, #F3BA2F, #CF7D33)'
                                }}
                                onClick={() => handleStake()}
                            >
                                {t("getStakingModal.stake")}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </ModalSetting>
    )
}

export default GetStakingModal;


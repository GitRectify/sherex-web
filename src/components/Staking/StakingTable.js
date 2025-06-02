import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { parseUnits } from "ethers";
import { useActions } from "../../hooks/useActions";
import { getTokenLogo } from "../../utils";
import { SHRX_TOKEN } from "../../constants";
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
const StakingTable = ({ pool, onStake }) => {
    useEffect(() => {
        //console.log('pools:', pool);
    })
    const { t } = useTranslation();
 
    console.log(pool);

    const avatar = pool.rewardToken === SHRX_TOKEN.address ? "/static/images/icons/avatar.png" : getTokenLogo(pool.rewardToken);

    return (
        <div className="text-white rounded-2xl px-2 sm:px-6 py-4 mt-5 border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
            <div className="flex items-center mt-4 sm:px-4 py-2 border-b border-[#FFFFFF1A]">
                <div className="flex items-center w-full">
                    <div className="w-8 h-8">
                        <img src={avatar} className="w-8 h-8 rounded-full" alt="ETH" />
                    </div>
                    <p className="font-medium text-White text-base ml-2">${pool.rewardTokenSymbol}</p>
                </div>
                <div className="md:flex w-full">
                    <div className="flex-1 flex-col md:text-right text-left">
                        <p className="text-sm text-gray-400">{t("staking.pendingReward")}</p>
                        <p className="text-sm text-white">{pool.rewards} ${pool.rewardTokenSymbol}</p>
                    </div>
                    <div className="flex-1 flex-col md:text-right text-left">
                        <p className="text-sm text-gray-400">{t("staking.staked")}</p>
                        <p className="text-sm text-white">{pool.staked} ${pool.stakingTokenSymbol}</p>
                    </div>
                    <div className="flex-1 flex-col md:text-right text-left">
                        <p className="text-sm text-gray-400">{t("staking.apr")}</p>
                        <p className="text-sm text-white">{pool.apy}%</p>
                    </div>
                    <div className="flex-1 flex-col md:text-right text-left">
                        <p className="text-sm text-gray-400">{t("staking.liquidity")}</p>
                        <p className="text-sm text-white">${pool.liquidity}</p>
                    </div>
                </div>
            </div>
            <div className="flex-col gap-4 flex md:flex-row items-center sm:px-4 py-4 hover:bg-white cursor-pointer hover:bg-opacity-5 transition-colors">
                <div className="flex w-full justify-between items-center">
                    <div className="flex-1">
                        <p className=" text-gray-400">{t("staking.totalLocked")}:</p>
                        <p className=" text-gray-400">{t("staking.averageLockDuration")}:</p>
                    </div>
                    <div className="flex-1 text-left">
                        <p className=" text-white">${pool.liquidity}</p>
                        <p className=" text-white">{pool.lockPeriod} {t("staking.days")}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center border border-white border-opacity-10 items-center gap-4 bg-white bg-opacity-20 text-white rounded-2xl px-6 py-4 w-full lg:w-[700px]">
                    <p className="text-gray-400">{t("staking.stakeAndLock")}</p>
                    <button
                        className="px-4 py-2 rounded-lg text-black hover:opacity-70 transition-opacity"
                        style={{
                            background: 'linear-gradient(to right, #CF7D33, #F3BA2F)'
                        }}
                        onClick={onStake}
                    >
                        {t("staking.getSHRX")}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default StakingTable;


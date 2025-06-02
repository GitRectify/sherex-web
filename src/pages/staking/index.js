import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import StakingTable from "../../components/Staking/StakingTable";
import ModalSetting from "../../components/Modals/ModalSetting";
import { parseUnits, formatUnits } from "ethers";
import { useActions } from "../../hooks/useActions";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import EditableStakingAPY from "../../components/Modals/EditableStakingAPY";
import EditableStakingLockPeriod from "../../components/Modals/EditableStakingLockPeriod";
import GetStakingModal from "../../components/Staking/GetStakingModal";
const Staking = () => {
    const { t } = useTranslation();
    const [isSettingModal, setIsSettingModal] = useState(false);
    const [apyOptions, setApyOptions] = useState([30, 100, 220, 400])
    const [periodOptions, setPeriodOptions] = useState([30, 100, 220, 400])
    const [tokenAddress, setTokenAddress] = useState('')
    const [poolAmount, setPoolAmount] = useState('')
    const { createStakingPool, getDecimals, getSymbol, getRemainingStakingTokens } = useActions();
    const [isStakingModal, setIsStakingModal] = useState(false); // Add this
    const [selectedPool, setSelectedPool] = useState(null);
    const dispatch = useDispatch();
    const { tokens, loading: tokensLoading } = useSelector((state) => state.tokens);
    const { pools, loading: poolsLoading } = useSelector((state) => state.pools);
    const { stakingPools, loading: stakingPoolsLoading } = useSelector((state) => state.staking);
    const handleOpenStakingModal = (pool) => {
        if (pool) {  // Only set if pool exists
            setSelectedPool(pool);
            setIsStakingModal(true);
        }
    };

    const handleCloseStakingModal = () => {
        setIsStakingModal(false);
        setSelectedPool(null);  // Clear selected pool when closing
    };

    const handleCreateStakingPool = async () => {
        if (tokenAddress === "" || poolAmount === "") {
            return;
        }
        try {
            const decimals = await getDecimals(tokenAddress);
            const amount = parseUnits(poolAmount, decimals);
            await createStakingPool(tokenAddress, amount, apyOptions, periodOptions);
        }
        catch (err) {
            //console.log(err);
        }
    }
    return (
        <div className="flex justify-center w-full">
            <div
                className="pt-28 pb-40 max-sm:px-4  max-[1390px]:px-10 w-[1290px] flex flex-col relative">
                <div className="flex justify-between items-center w-full">
                    <div className="mb-5">
                        <p className="text-2xl font-bold" style={{
                            backgroundImage: 'linear-gradient(to right, #F3BA2F, #CF7D33)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {t("staking.title")}
                        </p>
                        <p className="text-white text-sm">
                            {t("staking.subTitle")}
                        </p>
                    </div>
                    <button
                        className="px-4 py-2 rounded-lg text-black hover:opacity-70 transition-opacity truncate"
                        style={{
                            background: 'linear-gradient(to right, #CF7D33, #F3BA2F)'
                        }}
                        onClick={() => setIsSettingModal(true)}

                    >
                        {t("staking.createStake")}
                    </button>
                    <ModalSetting
                        isOpen={isSettingModal}
                        onClose={() => setIsSettingModal(false)}
                        title={t("createStakingModal.title")}
                    >
                        <div className="flex flex-col w-full px-4">
                            <p className="text-white text-left">{t("createStakingModal.tokenAddress")}</p>
                            <div className="flex justify-between w-full items-center gap-4">
                                <input
                                    type="text"
                                    placeholder={t("createStakingModal.enterTokenAddress")}
                                    className="w-full bg-white bg-opacity-20 text-white px-4 border border-white border-opacity-20 py-1 mt-2 rounded-xl 
                  focus:outline-none focus:border-[#F3BA2F]"
                                    value={tokenAddress}
                                    onChange={(e) => setTokenAddress(e.target.value)}
                                />
                                {/* <div className="w-4 h-4 flex justify-center items-center cursor-pointer">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.08209 4.97906V3.8293C5.08209 2.55931 6.11162 1.52979 7.3816 1.52979L10.8309 1.52979C12.1009 1.52979 13.1304 2.55931 13.1304 3.8293V7.27858C13.1304 8.54857 12.1009 9.57809 10.8309 9.57809H9.68112M5.08209 4.97906H3.93233C2.66234 4.97906 1.63281 6.00859 1.63281 7.27858V10.7279C1.63281 11.9978 2.66234 13.0274 3.93233 13.0274H7.3816C8.65159 13.0274 9.68112 11.9978 9.68112 10.7279V9.57809M5.08209 4.97906H7.3816C8.65159 4.97906 9.68112 6.00859 9.68112 7.27858V9.57809" stroke="white" stroke-width="0.862319" stroke-linejoin="round" />
                                    </svg>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col w-full px-4 pt-2">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-white text-left w-full">{t("createStakingModal.poolAmount")}</p>
                                {/* <div className="items-center">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6.10621" cy="3.94434" r="0.431159" fill="white" />
                                        <path d="M5.67511 5.23785H6.10627V8.25597M10.4179 6.10017C10.4179 8.4814 8.4875 10.4118 6.10627 10.4118C3.72504 10.4118 1.79468 8.4814 1.79468 6.10017C1.79468 3.71894 3.72504 1.78857 6.10627 1.78857C8.4875 1.78857 10.4179 3.71894 10.4179 6.10017Z" stroke="white" stroke-width="0.646739" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div> */}
                            </div>
                            <input
                                type="number"
                                placeholder={t("createStakingModal.enterPool")}
                                className="w-full bg-white bg-opacity-20 text-white px-4 py-1 mt-2 rounded-xl 
                 border border-white border-opacity-20  focus:outline-none focus:border-[#F3BA2F]"
                                value={poolAmount}
                                onChange={(e) => setPoolAmount(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full px-4 pt-4">
                            <EditableStakingAPY
                                title={t("createStakingModal.apy")}
                                onChange={setApyOptions}
                                options={apyOptions}
                            />
                        </div>
                        <div className="flex flex-col w-full px-4">
                            <EditableStakingLockPeriod
                                title={t("createStakingModal.lockPeriodInDays")}
                                onChange={setPeriodOptions}
                                options={periodOptions}
                            />
                        </div>
                        <div className="flex flex-col items-center w-full">
                            <button
                                className="py-2 rounded-lg text-black hover:opacity-70 transition-opacity whitespace-nowrap w-[200px] text-center"
                                style={{
                                    background: 'linear-gradient(to right, #F3BA2F, #CF7D33)'
                                }}
                                onClick={() => handleCreateStakingPool()}
                            >
                                {t("createStakingModal.create")}
                            </button>
                        </div>
                    </ModalSetting>
                </div>
                {tokensLoading ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <ClipLoader color="#F3BA2F" loading={true} size={50} />
                    </div>
                ) : stakingPools.length > 0 ? (
                    stakingPools.map((pool) => (
                        <StakingTable key={pool.id} pool={pool} onStake={() => handleOpenStakingModal(pool)} />
                    ))
                ) : (
                    <div className="text-white text-center py-10">
                        No staking pools available
                    </div>
                )}
                <GetStakingModal
                    isOpen={isStakingModal}
                    onClose={handleCloseStakingModal}
                    pool={selectedPool}
                />
            </div >
        </div>
    )
}

export default Staking;
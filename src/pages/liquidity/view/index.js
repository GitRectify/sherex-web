import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import LiquidityViewDetail from "../../../components/Charts/Liquidity/LiquidityView";
import { Link } from "react-router-dom";
import LiquidityChart from "../../../components/Portfolio/LiquidityChart";
import { useEffect, useRef } from "react";
import DropdownResponsiveButton from "../../../components/ButtonGroup/DropdownResponsiveButton";
import { useTranslation } from "react-i18next";
import { getTokenLogo, getMasterChefPoolInfo, calculateApr } from "../../../utils";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppKitAccount } from "@reown/appkit/react";
import { filterSwapsByTime, sampleData } from "../../../utils";
import { SHRX_TOKEN } from "../../../constants";
import AddMasterChefModal from "../../../components/Modals/AddMasterChefModal";
import ModalSetting from "../../../components/Modals/ModalSetting";
import PositionTable from "../../../components/Charts/Liquidity/PositionTable";
const LiquidityView = () => {
    const { poolId } = useParams();
    const { address, isConnected } = useAppKitAccount();
    const [setShowDropdown] = useState(false);
    const [isAddToMasterChefModal, setIsAddToMasterChefModal] = useState(false);
    const [liquidityData, setLiquidityData] = useState([]);
    const [myPositions, setMyPositions] = useState();
    const [stakedPositions, setStakedPositions] = useState([]);
    const [selectedTime, setSelectedTime] = useState('1m');
    const [apr, setApr] = useState(0);
    const dropdownRef = useRef(null);
    const { t } = useTranslation();
    const { pools, loading: poolsLoading } = useSelector((state) => state.pools);
    const { masterChef, pools: masterChefPools, loading: masterChefPoolsLoading } = useSelector((state) => state.masterChef);
    const pool = pools.find((pool) => pool.id === poolId);

    const { positions, loading: positionsLoading } = useSelector((state) => state.positions);
    const { userPositions, loading: userPositionsLoading } = useSelector((state) => state.masterChef);
    // const options = [
    //     { value: '24h', label: t("chartButtons.volume") },
    //     { value: '1w', label: t("chartButtons.liquidity") },
    //     { value: '1m', label: t("chartButtons.fees") },
    //     { value: 'TVL', label: t("chartButtons.tvl") }
    // ];

    const { tokens, loading: tokensLoading } = useSelector((state) => state.tokens);
    const sherexTokens = tokens.filter((token) => token.id === SHRX_TOKEN.address);
    const sherexToken = sherexTokens.length > 0? sherexTokens[0] : null;

    const masterChefPool = getMasterChefPoolInfo(masterChefPools, poolId);

    useEffect(() => {
        if (pool) {
            const apr_ = masterChefPool ? calculateApr(pool, masterChef, masterChefPools, sherexToken) : 0;
            setApr(apr_);
        }
    }, [pool])

    useEffect(() => {
        if (!isConnected || !positions || !userPositions || !pool || !address) return;

        const position = positions.filter((p) => p.owner.toLowerCase() === address.toLowerCase() && p.pool.id === pool.id);
        const stakedPosition = userPositions.filter((p) => p.isStaked && p.pool.v3Pool === pool.id);
        setMyPositions(position);
        setStakedPositions(stakedPosition);
    }, [positions, userPositions, pool, address, isConnected])

    const options = [
        { value: '24h', label: '24h' },
        { value: '1w', label: '1w' },
        { value: '1m', label: '1M' },
    ];
    const buttons = [
        { value: '24h', label: '24h' },
        { value: '1w', label: '1w' },
        { value: '1m', label: '1M' },
    ];

    const { swaps, loading: swapsLoading } = useSelector((state) => state.swaps);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!pool || !swaps) return;
        const filteredSwaps = swaps.filter((swap, index) => {
            return (swap.pool.id === pool?.id)
        })

        const filteredData = filteredSwaps.map((swap, index) => {
            return {
                timestamp: swap.timestamp,
                liquidity: swap.liquidity
            }
        });
        const liquidityData = filterSwapsByTime(filteredData, selectedTime);
        liquidityData.push({
            timestamp: parseInt(((new Date()).getTime()) / 1000),
            liquidity: pool.liquidity
        })
        liquidityData.push({
            timestamp: parseInt(((new Date()).getTime()) / 1000 - 1000),
            liquidity: pool.liquidity
        })
        let result = liquidityData;
        if (selectedTime === '24h') {
            result = sampleData(liquidityData, 12);
        }
        else if (selectedTime === '1w') {
            result = sampleData(liquidityData, 7);
        }
        else if (selectedTime === '1m') {
            result = sampleData(liquidityData, 10);
        }

        setLiquidityData(result);
    }, [pool, selectedTime, swaps])

    const handleActiveTime = (item) => {
        setSelectedTime(item);
    }

    const onAddToMasterChef = () => {
        setIsAddToMasterChefModal(true);
    }

    return (
        <div className="flex justify-center w-full">
            { poolsLoading || !pool || tokensLoading || masterChefPoolsLoading ? 
            (
                <div className="flex justify-center items-center h-[50vh]">
                        <ClipLoader
                            color="#F3BA2F"
                            loading={poolsLoading || tokensLoading || masterChefPoolsLoading}
                            size={50}
                            aria-label="Loading Spinner"
                        />
                </div>
            ):
            (<div className="pt-28 pb-40 px-4 lg:px-10 min-[1390px]:px-0  flex flex-col relative w-full xl:w-[1290px]">
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-4 w-full">
                        <div className="flex-1 flex items-center gap-2">
                            <Link to="/liquidity" className="text-white cursor-pointer">
                                <img src="/static/images/icons/arrow-left.svg" className="w-10 h-10 rounded-full" alt="ETH" />
                            </Link>
                            <div className="flex -space-x-2">
                                <img src={`${getTokenLogo(pool.token0.id)}`} className="w-10 h-10 rounded-full" alt={`${pool.token0.symbol}`} />
                                <img src={`${getTokenLogo(pool.token1.id)}`} className="w-10 h-10 rounded-full" alt={`${pool.token1.symbol}`} />
                            </div>
                            <span className="text-white text-xl ml-6">{pool.token0.symbol}/{pool.token1.symbol}</span>
                            <Link to={`https://bscscan.com/address/${pool.id}`} target="_blank" className="text-[#F3BA2F] truncate cursor-pointer">{t("chartButtons.volume")}</Link>
                            <img to={`https://bscscan.com/address/${pool.id}`} target="_blank" src="/static/images/icons/copy-check.svg" className="w-4 h-4 rounded-full cursor-pointer" alt="ETH" />
                        </div>
                    </div>
                    <div className="hidden sm:flex justify-end gap-5 items-center w-full">
                        <div className="flex flex-col items-center">
                            <div className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md py-1 px-3">
                                <Link to={`/liquidity/pool/${pool.token0.id}/${pool.token1.id}`}>{t("liquidityView.addLiquidity")}</Link>
                            </div>
                        </div>
                        { isConnected && address.toLowerCase() === masterChef.owner.toLowerCase() && !masterChefPool && <div className="flex flex-col items-center">
                            <div className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md py-1 px-3" onClick={onAddToMasterChef}>
                                {t("liquidityView.addPoolToMasterChef")}
                            </div>
                        </div> }
                        <div className="flex flex-col">
                            <p className="text-white text-sm">{t("liquidityView.fee")}</p>
                            <p className="text-[#CF7D33] border rounded-lg border-[#CF7D33] text-center text-sm px-1">V3 | {pool.feeTier / 10000}%</p>
                        </div>
                        <div className="flex flex-col text-sm">
                            <p className="text-white">{t("liquidityView.network")}</p>
                            <p className="text-white">{t("liquidityView.bnbChain")}</p>
                        </div>
                        <div className="flex flex-col text-sm">
                            <p className="text-white">{t("liquidityView.apr")}</p>
                            <p className="text-white">{apr.toFixed(5)}%</p>
                        </div>
                        <div className="flex flex-col text-sm">
                            <p className="text-white">{t("liquidityView.poolType")}</p>
                            <p className="text-[#CF7D33] border rounded-lg border-[#CF7D33] text-center">{t("liquidityView.v3")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex px-4 sm:px-20 mt-4 gap-4">
                    <p className="text-white font-semibold">{t("chartButtons.pairInfo")}</p>
                    <p className="text-white text-opacity-80">1 {pool.token0.symbol} = {Number(pool.token1Price)?.toFixed(4)} {pool.token1.symbol}, 1 {pool.token1.symbol} = {Number(pool.token0Price)?.toFixed(4)} {pool.token0.symbol} </p>
                </div>
                <div className="pt-28 pb-10 flex lg:flex-row gap-4 flex-col relative h-full">
                    {/* Home header */}
                    <div className="max-lg:order-2 flex flex-col justify-start items-start p-10 lg:w-3/5 w-full text-white sm:px-10 px-4 rounded-2xl relative overflow-hidden border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
                        <div className="w-full">
                            <div className="flex justify-between">
                                <p className="text-sm text-[#F3BA2F] font-medium">{t("liquidityView.past24Hour")}</p>
                                <DropdownResponsiveButton options={options} propButtons={buttons} handleSelect={handleActiveTime} />
                            </div>
                            <LiquidityChart liquidityData={liquidityData} />
                        </div>
                    </div>
                    <div className="max-lg:order-1 lg:w-2/5 w-full flex justify-end items-center">
                        <LiquidityViewDetail pool={pool} />
                    </div>
                </div>

                <PositionTable positions={myPositions} stakedPositions={stakedPositions} isMasterChefPool={masterChefPool} token0={pool.token0} token1={pool.token1}></PositionTable>
            </div >
            )
        }
        <ModalSetting
            isOpen={isAddToMasterChefModal}
            onClose={() => setIsAddToMasterChefModal(false)}
            title={t("addToMasterChefModal.title")}
            isSmall={true}
        >
            <AddMasterChefModal poolId={poolId} totalAllocPoint={masterChef.totalAllocPoint}/>
        </ModalSetting>
        </div>
    )
}

export default LiquidityView;
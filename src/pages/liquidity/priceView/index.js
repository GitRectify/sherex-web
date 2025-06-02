import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LiquidityViewDetail from "../../../components/Charts/Liquidity/LiquidityView";
import { Link } from "react-router-dom";
import LiquidityChart from "../../../components/Portfolio/LiquidityChart";
import { useEffect, useRef } from "react";
import DropdownResponsiveButton from "../../../components/ButtonGroup/DropdownResponsiveButton";
import { useTranslation } from "react-i18next";
import { getTokenLogo } from "../../../utils";
const PriceView = () => {
    const { poolId } = useParams();
    const [setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { t } = useTranslation();
    const { pools } = useSelector((state) => state.pools);
    const pool = pools.find((pool) => pool.id === poolId);
    const options = [
        { value: '24h', label: t("chartButtons.volume") },
        { value: '1w', label: t("chartButtons.liquidity") },
        { value: '1m', label: t("chartButtons.fees") },
        { value: 'TVL', label: t("chartButtons.tvl") }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div className="flex justify-center w-full">
            <div className="pt-28 pb-40 px-4 lg:px-10 min-[1390px]:px-0  flex flex-col relative w-full xl:w-[1290px]">
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
                            <p className="text-[#F3BA2F] truncate">{t("chartButtons.volume")}</p>
                            <img src="/static/images/icons/copy-check.svg" className="w-4 h-4 rounded-full" alt="ETH" />
                        </div>
                    </div>
                    <div className="hidden sm:flex justify-end gap-6 items-center w-full">
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
                            <p className="text-white">52.52%</p>
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
                <div
                    className="pt-28 pb-40 flex lg:flex-row gap-4 flex-col relative h-full"

                >
                    <div className="w-full flex justify-center items-center">
                        <LiquidityViewDetail pool={pool} />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default PriceView;
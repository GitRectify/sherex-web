import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LiquidityTableHeader from "./tableHeader";
import { getTokenLogo, getMasterChefPoolInfo, calculateApr } from "../../utils";
import { SHRX_TOKEN } from "../../constants";

const LiquidityTable = ({ pools, masterChefPools, masterChef, tokens }) => {
    const { t } = useTranslation();

    const sherexTokens = tokens.filter((token) => token.id === SHRX_TOKEN.address);
    const sherexToken = sherexTokens.length > 0? sherexTokens[0] : null;

    return (
        <div className=" text-white rounded-2xl px-4 sm:px-6 py-4 border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
            <LiquidityTableHeader />
            <div className="flex items-center mt-4 px-4 py-2 border-b border-[#FFFFFF1A]">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.pool")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.feeTier")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.liquidity")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.volume")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.fee")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.apr")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.volume24")}</p>
                </div>
                <div className="block lg:hidden flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("liquidityTable.volume24")}/{t("liquidityTable.apr")}</p>
                </div>
            </div>
            {pools.map((pool) => {
                const masterChefPool = getMasterChefPoolInfo(masterChefPools, pool.id);
                const apr = masterChefPool ? calculateApr(pool, masterChef, masterChefPools, sherexToken) : 0;
                return (
                    <div className="flex items-center px-4 py-4 hover:bg-white cursor-pointer hover:bg-opacity-5 transition-colors">
                        <div className="flex-1 flex items-center gap-2 transition-all duration-200 hover:scale-110 hover:opacity-80">
                            <Link to={`/liquidity/view/${pool.id}`} className="flex -space-x-2">
                                <img src={`${getTokenLogo(pool.token0.id)}`} className="w-6 h-6 rounded-full" alt={`${pool.token0.symbol}`} />
                                <img src={`${getTokenLogo(pool.token1.id)}`} className="w-6 h-6 rounded-full" alt={`${pool.token1.symbol}`} />
                            </Link>
                            <Link to={`/liquidity/view/${pool.id}`} className="text-white ">{pool.token0.symbol}/{pool.token1.symbol}</Link>
                        </div>
                        <div className="max-lg:hidden lg:flex-1 text-right">
                            <p className="text-white">{pool.feeTier / 10000}%</p>
                        </div>
                        <div className="max-lg:hidden lg:flex-1 text-right">
                            <p className="text-white">${pool.liquidity?.toFixed(2)}</p>
                        </div>
                        <div className="max-lg:hidden lg:flex-1 text-right">
                            <p className="text-white">${pool.volume?.toFixed(2)}</p>
                        </div>
                        <div className="max-lg:hidden lg:flex-1 text-right">
                            <p className="text-white">${pool.collectedFees?.toFixed(2)}</p>
                        </div>
                        <div className="flex-1 text-right items-center justify-end gap-2">
                            <div>
                                <p className="text-white text-xs">{masterChefPool ? apr.toFixed(5) : 0}%</p>
                                <div className="flex justify-end">
                                    <div className="w-14 h-2 bg-white bg-opacity-20 rounded-full">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${masterChefPool ? (apr > 100 ? 100 : apr) : 0}%`,
                                                background: 'linear-gradient(to right, #F3BA2F, #CF7D33)'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-[#53F3C3]" ></div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block lg: flex-1 text-right">
                            <div className="flex justify-end gap-3 items-center">
                                <Link to={`/liquidity/chartView/${pool.id}`} className="hidden lg:flex items-center rounded-lg text-black transition-all duration-200 hover:scale-110 hover:opacity-80">
                                    <img
                                        src="/static/images/icons/btn.svg"
                                        className="w-6 h-6"
                                        alt="search"
                                    />
                                </Link>
                                <div className="">
                                    <Link to={`/liquidity/priceView/${pool.id}`} className="hidden lg:flex items-center rounded-lg text-black transition-all duration-200 hover:scale-110 hover:opacity-80">
                                        <img
                                            src="/static/images/icons/btn1.svg"
                                            className="w-6 h-6"
                                            alt="search"
                                        />
                                    </Link>
                                </div>
                                {/* <div className="">
                                    <button className="px-4 py-1 rounded-lg text-black" style={{
                                        background: 'linear-gradient(to right, #CF7D33, #F3BA2F)'
                                    }}>{t("liquidityTable.deposit")}</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    )
                }
            )}
        </div>
    )
}

export default LiquidityTable;
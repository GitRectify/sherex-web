import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTokenLogo } from "../../utils";
const TokenTables = (props) => {
    const { t } = useTranslation();
    const formatNumber = (value) => {
        const num = parseFloat(value) || 0;
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toFixed(2);
    };
    const { tokenData } = props;
    return (
        <div className="relative overflow-hidden  text-white rounded-3xl px-6 py-4 border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
            {/* Table Headers */}
            <div className="flex items-center mt-4 px-4 py-2 border-b border-[#FFFFFF1A]">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">{t("tokenTable.name")}</p>
                </div>
                <div className="flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("tokenTable.price")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm  font-medium text-gray-400">{t("tokenTable.priceChange")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("tokenTable.volume")}</p>
                </div>
                <div className="hidden lg:block flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400">{t("tokenTable.tvl")}</p>
                </div>
                <div className="lg:hidden  flex-1 text-right">
                    <p className="text-sm font-medium text-gray-400 truncate">{t("tokenTable.volumeTvl")}</p>
                </div>
            </div>

            {/* Table Row */}
            {tokenData.map((token) => (
                <Link
                    key={token.id}
                    to={`/tokens/${token.id}`}
                    className="flex items-center px-4 py-4 hover:bg-white cursor-pointer hover:bg-opacity-5 transition-colors"
                >
                    <div className="flex-1 flex flex-col items-start gap-2">
                        <div className="flex items-center gap-1">
                            <img src={`${getTokenLogo(token.id)}`} className="w-6 h-6 rounded-full" alt={token.symbol} />
                            <div>
                                <span className="text-white font-medium">{token.name}</span>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-xl px-1 py-[1px] ml-8">
                            <span className="text-white text-sm">{token.symbol}</span>
                        </div>
                    </div>

                    <div className="lg:block hidden flex-1 text-right">
                        <p className="text-white">
                            ${token.price ? Number(token.price)?.toFixed(2) : "0.00"}
                        </p>
                    </div>

                    <div className="lg:hidden flex-1 text-right">
                        <p className="text-white">
                            ${token.price ? Number(token.price)?.toFixed(2) : "0.00"}
                        </p>
                        <p className="text-[#53F3C3]">{token.priceChange ? Number(token.priceChange)?.toFixed(2) : "0.00"}%
                        </p>
                    </div>

                    <div className="hidden lg:block lg:flex-1 text-right">
                        <p className="text-[#53F3C3]">{token.priceChange ? Number(token.priceChange)?.toFixed(2) : "0.00"}%</p>
                    </div>

                    <div className="hidden lg:block flex-1 text-right">
                        <p className="text-white">${token.volume ? Number(token.volume)?.toFixed(2) : "0.00"}</p>
                    </div>

                    <div className="hidden lg:block flex-1 text-right">
                        <p className="text-white">    ${formatNumber(token?.totalValueLocked)}
                        </p>
                    </div>

                    <div className="lg:hidden flex-1 text-right">
                        <p className="text-white">${token.volume ? Number(token.volume)?.toFixed(2) : "0.00"}%</p>
                        <p className="text-white">    ${formatNumber(token?.totalValueLocked)}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default TokenTables;
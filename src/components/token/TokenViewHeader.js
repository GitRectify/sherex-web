
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTokenLogo } from "../../utils";
const TokenViewHeader = (props) => {
    const { t } = useTranslation();
    const { tokenId, tokenName, tokenSymbol, tokenPrice, tokenPriceChange } = props;
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-4 w-full">
                    <div className="flex-1 hidden lg:flex items-center gap-1">
                        <Link to="/tokens" className="text-white cursor-pointer">
                            <img src="/static/images/icons/arrow-left.svg" className="w-10 h-10 rounded-full" alt="ETH" />
                        </Link>
                        <div className="flex -space-x-2">
                            <img  src={`${getTokenLogo(tokenId)}`} className="w-10 h-10 rounded-full" alt={tokenSymbol} />
                        </div>
                        <div className="flex">
                            <span className="text-white text-xl ml-6">{tokenName}</span>
                        </div>
                        <div className="flex border border-black border-opacity-60 bg-white bg-opacity-20 rounded-xl p-1 px-2 items-center gap-1 ml-4">
                            <p className="text-white font-normal">{tokenSymbol}</p>
                        </div>
                        <Link to={`https://bscscan.com/token/${tokenId}`} target="_blank" className="flex items-center gap-1 cursor-pointer ml-4">
                            <p className="text-[#F3BA2F] truncate">{t("tokenView.viewOnBSC")}</p>
                            <img src="/static/images/icons/copy-check.svg" className="w-4 h-4 rounded-full" alt="ETH" />
                        </Link>
                    </div>
                    <div className="flex-1 lg:hidden flex items-center gap-1 w-full">
                        <Link to="/tokens" className="text-white cursor-pointer">
                            <img src="/static/images/icons/arrow-left.svg" className="w-10 h-10 rounded-full" alt="ETH" />
                        </Link>
                        <div className="flex justify-center items-center w-10 h-10">
                            <img src="/static/images/icons/icon-crypto1.svg" className="w-full h-full" alt="ETH" />
                        </div>
                        <div className="hidden sm:flex sm:flex-col">
                            <span className="text-white text-xl ml-6">{tokenName}</span>
                            <p className="text-white text-xl ml-6 truncate">+{Number(tokenPrice).toFixed(2)}<span className="text-[#1AEFAF] ml-6">{tokenPriceChange}%</span></p>
                        </div>
                        <div className="flex border border-black border-opacity-60 bg-white bg-opacity-20 rounded-xl p-1 px-2 items-center gap-1 ml-4">
                            <p className="text-white font-normal">{tokenSymbol}</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 cursor-pointer ml-4">
                            <p className="text-[#F3BA2F] truncate">{t("tokenView.viewOnBSC")}</p>
                            <img src="/static/images/icons/copy-check.svg" className="w-4 h-4 rounded-full" alt="ETH" />
                        </div>
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col lg:items-center items-end justify-end gap-6">
                    <Link to={`/Liquidity/pool/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/${tokenId}`}
                        className="px-4 py-2 rounded-lg text-black hover:opacity-70 transition-opacity flex whitespace-nowrap"
                        style={{
                            background: 'linear-gradient(to right, #CF7D33, #F3BA2F)'
                        }}
                    >
                        {t("tokenView.addLiquidity")}
                    </Link>
                    <Link to={`/`}
                        className="px-4 py-2 rounded-lg text-white hover:opacity-70 transition-opacity border border-[#F3BA2F]"

                    >
                        {t("tokenView.trade")}
                    </Link>
                </div>
            </div>
            <div className="hidden lg:flex px-20 mt-4 gap-4">
                <p className="text-white font-semibold">{t("tokenView.price")}: ${tokenPrice}</p>
                <p className="text-[#1AEFAF] text-opacity-80">{t("tokenView.priceChange")}: {tokenPriceChange}% </p>
            </div>
        </div>

    )
}

export default TokenViewHeader;
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LiquidityDetail from "../../../components/token/TokenDetail";
import LiquidityChart from "../../../components/Portfolio/LiquidityChart";
import TokenViewHeader from "../../../components/token/TokenViewHeader";
import DropdownResponsiveButton from "../../../components/ButtonGroup/DropdownResponsiveButton";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
const TokenView = () => {
    const { t } = useTranslation();
    // const options = [
    //     { value: '24h', label: t("chartButtons.volume") },
    //     { value: '1w', label: t("chartButtons.liquidity") },
    //     { value: '1m', label: t("chartButtons.fees") },
    //     { value: '1m', label: t("chartButtons.tvl") },
    // ];
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
    const [token, setToken] = useState(null);
    const [liquidityData, setLiquidityData] = useState([]);
    const { tokenId } = useParams();
    const { tokens } = useSelector((state) => state.tokens);
    const [selectedTime, setSelectedTime] = useState('1m');

    const { swaps, loading: swapsLoading } = useSelector((state) => state.swaps);

    useEffect(() => {
        if (tokens && tokens.length > 0) {
            const foundToken = tokens.find(t => t.id === tokenId);
            setToken(foundToken || null);
        }
        ////console.log("tokenID:", tokenId);
        ////console.log('tokens:', tokens);
        ////console.log("token", token);
    }, [tokens, tokenId]);

    useEffect(() => {
        if (!token || !swaps) return;
        const filteredSwaps = swaps.filter((swap, index) => {
            return (swap.token0.id === token.id || swap.token1.id === token.id);
        })

        const liquidityData = filteredSwaps.map((swap, index) => {
            const liquidity = swap.token0.id === token.id ? swap.token0Locked : swap.token1Locked;
            return {
                timestamp: swap.timestamp,
                liquidity: liquidity
            }
        });
        setLiquidityData(liquidityData);
    }, [token, swaps])

    const handleActiveTime = (item) => {
        setSelectedTime(item);
    }

    return (
        <div className="flex justify-center w-full">
            <div
                className="pt-28 pb-40 flex flex-col relative w-full xl:w-[1290px]  px-4 lg:px-10 min-[1390px]:px-0"
            >
                <TokenViewHeader tokenId={tokenId} tokenName={token?.name} tokenSymbol={token?.symbol} tokenPrice={token?.price || 1} tokenPriceChange={token?.priceChange || 2} />
                <div
                    className="pt-28 pb-40 flex lg:flex-row flex-col gap-8 relative h-full"

                >
                    {/* Home header */}
                    <div className="flex flex-col justify-start items-start p-10 lg:w-3/5 w-full text-white sm:px-10 px-4 rounded-2xl order-2 lg:order-1 border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50"
                    >
                        <div className="w-full">
                            {/* <div className="flex">
                                <p className=" font-semibold text-base text-white">+227.543364</p>
                            </div> */}
                            <div className="flex justify-between">
                                <p className="text-sm text-[#F3BA2F] font-medium">{t("liquidityView.past24Hour")}</p>
                            </div>
                            <LiquidityChart liquidityData={liquidityData} />

                        </div>
                    </div>
                    <div className="lg:w-2/5 w-full flex justify-end items-center order-1 lg:order-2 ">
                        <LiquidityDetail TVL={token?.totalValueLocked || 100} volumeH={token?.volume || 124} volumeD={token?.volume || 123} transaction={token?.txCount || 125} />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default TokenView;
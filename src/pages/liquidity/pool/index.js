import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LiquidityPoolChart from "../../../components/Portfolio/LiquidityPoolChart";
import { contractAddresses, WETH_ADDRESS } from "../../../constants";
import { parseUnits, toBigInt } from "ethers";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import {
    getSqrtPriceX96,
    getTickBounds,
    FEE_TIERS,
    TICK_SPACINGS,
    adjustPriceForDecimals
} from '../../../utils';
import SwapSettingModal from "../../../components/Charts/SwapSettingModal";
import ClipLoader from "react-spinners/ClipLoader";

import { useActions } from "../../../hooks/useActions";
import { staticTokens } from "../../../constants";

const LiquidityPool = () => {
    const dispatch = useDispatch();
    const { tokenA, tokenB } = useParams();
    const { t } = useTranslation();
    const [activeTime, setActiveTime] = useState('24h');
    const [loading, setLoading] = useState(false);

    const { approveToken, addLiquidity, depositWBNB } = useActions();

    const [info, setInfo] = useState({
        token0: {
            address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
            name: "Wrapped BNB",
            symbol: "WBNB",
            decimals: 18,
            logo: 'https://bscscan.com/token/images/bnbchain2_32.png'
        },
        token1: {
            address: "0x55d398326f99059ff775485246999027b3197955",
            name: "Tether USD",
            symbol: "USDT",
            decimals: 18,
            logo: 'https://bscscan.com/token/images/busdt_32.png'
        },
        fee: '0.25',
        tickLower: -10000,
        tickUpper: 10000,
        range: 10,
        minVal: 0,
        maxVal: 100,
        amount0: 0,
        amount1: 0
    })

    const [isSettingModal, setIsSettingModal] = useState(false);
    const [swapSlippage, setSwapSlippage] = useState('0.5');
    const [liquiditySlippage, setLiquiditySlippage] = useState('0.5');
    const [txDeadline, setTxDeadline] = useState('30');

    const handleSetting = () => {
        setIsSettingModal(true);  // This opens the modal
    };
    const [tokens, setTokens] = useLocalStorage('tokens', []);

    useEffect(() => {
        if (!tokenA || !tokenB) return;

        const allTokens = staticTokens.concat(tokens);

        let token0 = null, token1 = null;
        let token0List = allTokens.filter((token) => token.address === tokenA.toLowerCase());
        let token1List = allTokens.filter((token) => token.address === tokenB.toLowerCase());

        if (token0List.length > 0) {
            token0 = { ...token0List[0] };
            if (token0.address === WETH_ADDRESS.toLowerCase()) {
                token0.isNative = false;
            }
        }
        if (token1List.length > 0) {
            token1 = { ...token1List[0] };
            if (token1.address === WETH_ADDRESS.toLowerCase()) {
                token1.isNative = false;
            }
        }

        if (token0 === null || token1 === null) return;
  
        setInfo(prev => ({ ...prev, token0: token0, token1: token1 }));
    }, [tokenA, tokenB, tokens])

    const handleAddLiquidity = async () => {
        const { token0, token1, fee, amount0, amount1, minVal, maxVal } = info;
        setLoading(true);
        try {
            const token0Amount = parseUnits(amount0, token0.decimals);
            const token1Amount = parseUnits(amount1, token1.decimals);

            // Calculate raw price without decimal adjustment

            // If token0 address is smaller, we need the reciprocal of the price
            const price = amount0 / amount1;
            let currentPrice = 0;
            if (token0 && token1) {
                currentPrice = token0.address.toLowerCase() < token1.address.toLowerCase() ? 1 / price : price;
            }

            // getSqrtPriceX96 will handle the decimal adjustments
            const sqrtPriceX96 = getSqrtPriceX96(
                currentPrice,
                token0,
                token1
            );
            ////console.log('sqrtPriceX96:', sqrtPriceX96.toString());

            // Calculate price range (adjusted to be more conservative)
            const [decimals0, decimals1] = token0.address.toLowerCase() < token1.address.toLowerCase() ? [token0.decimals, token1.decimals] : [token1.decimals, token0.decimals];
            const minPrice = currentPrice * 10 ** (decimals1 - decimals0) * 90 / 100;  // 5% below current price
            const maxPrice = currentPrice * 10 ** (decimals1 - decimals0) * 110 / 100;  // 5% above current price

            const feeTier = Number(fee) * 10000;

            // Get adjusted ticks based on price range and fee tier
            const { tickLower, tickUpper } = getTickBounds(
                minPrice,
                maxPrice,
                TICK_SPACINGS[feeTier]
            );

            ////console.log('tickLower:', tickLower);
            ////console.log('tickUpper:', tickUpper);

            if (token0.address.toLowerCase() == WETH_ADDRESS.toLowerCase() && token0.isNative == true) {
                await depositWBNB(token0Amount);
            }
            await approveToken(token0.address, contractAddresses.nonfungiblePositionManager, token0Amount);

            if (token1.address.toLowerCase() == WETH_ADDRESS.toLowerCase() && token1.isNative == true) {
                await depositWBNB(token1Amount);
            }
            await approveToken(token1.address, contractAddresses.nonfungiblePositionManager, token1Amount);

            const addLiquidityTx = await addLiquidity(
                token0.address.toLowerCase(),
                token1.address.toLowerCase(),
                feeTier,
                tickLower,
                tickUpper,
                token0Amount,
                token1Amount,
                sqrtPriceX96
            );

        } catch (err) {
            console.error('Add liquidity failed:', err);
            // You might want to add user feedback here
        }
        setLoading(false);
    }

    return (
        <div className="flex justify-center w-full">
            <div
                className="pt-28 pb-40 px-4 lg:px-10 min-[1390px]:px-0 flex flex-col relative xl:w-[1290px] w-full"
            >
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-4 w-full">
                        <div className="flex-1 flex items-center gap-1">
                            <span className="text-[#F3BA2F] text-xl">Liquidity Pools</span>
                        </div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <p className="text-white font-semibold">Provide {t("liquidity.earn")} yields.</p>
                </div>
                <div className="flex justify-center items-center p-10 text-white sm:px-10 px-4 rounded-2xl border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
                    <div className="w-full">
                        <div className="flex flex-col justify-between items-center">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-2">
                                    <Link to="/liquidity" className="text-white cursor-pointer">
                                        <img src="/static/images/icons/arrow-left.svg" className="w-6 h-6 rounded-full" alt="ETH" />
                                    </Link>
                                    <p className="font-semibold text-base text-white">Add Liquidity</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className=" text-gray-400">APR(with forming)</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <p className=" text-white text-base">55.29%</p>
                                        <div className="flex justify-center items-center w-5 h-5 cursor-pointer" onClick={handleSetting}>
                                            <img src="/static/images/icons/settingIcon.svg" className="w-5 h-5 rounded-full" alt="ETH" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <LiquidityPoolChart info={info} setInfo={setInfo} tokens={tokens} />
                            <div className="flex justify-center w-full mt-6">
                            {loading ?
                                <ClipLoader color="#F3BA2F"
                                    loading={loading}
                                    size={20}
                                    aria-label="Loading Spinner" 
                                /> :
                                <button className=" bg-black hover:bg-opacity-60 bg-opacity-40 rounded-xl py-3 w-[400px]" onClick={handleAddLiquidity}>Enter Amount</button>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default LiquidityPool;
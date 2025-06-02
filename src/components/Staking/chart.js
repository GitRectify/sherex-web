
import { useTranslation } from "react-i18next";
import PortChart from "../Portfolio/PortChart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DropdownResponsiveButton from "../ButtonGroup/DropdownResponsiveButton";
import { filterSwapsByTime, sampleData } from "../../utils";
const StakingChart = ({ info, swaps }) => {
    const { t } = useTranslation();
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

    const [selectedTime, setSelectedTime] = useState('1m');
    const [liquidityData, setLiquidityData] = useState([]);
    const { pools, loading: poolsLoading } = useSelector((state) => state.pools);
    const pool = pools.find((_pool) => (_pool.token0.id === info.token0.address && _pool.token1.id === info.token1.address) || (_pool.token0.id === info.token1.address && _pool.token1.id === info.token0.address));

    useEffect(() => {
        if (!pool || !swaps) return;
        const filteredSwaps = swaps.filter((swap, index) => {
            return (swap.token0.id === info.token0.address && swap.token1.id === info.token1.address) || (swap.token0.id === info.token1.address && swap.token1.id === info.token0.address)
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
    return (
        <div className="flex flex-col justify-start items-start p-10 lg:w-3/5 w-full text-white sm:px-10 px-4 rounded-2xl order-2 lg:order-1 relative overflow-hidden border border-[#F3BA2F] border-opacity-40 backdrop-blur-[20px] bg-gradient-to-br from-white/30 to-black/50">
            <div className="w-full flex justify-between items-center">
                <div className="flex">
                    <p className=" font-semibold text-base text-white">{info.token0 ? info.token0.symbol : ''}</p>
                    <p className="font-semibold text-base text-white">/</p>
                    <p className="font-semibold text-base text-white opacity-40">{info.token1 ? info.token1.symbol : ''}</p>
                    <div className="flex justify-center items-center ml-2 cursor-pointer">
                        <img
                            src="/static/images/icons/arrow-exchange-swap.svg"
                            className="w-3 h-3"
                            alt="taptool"
                        />
                    </div>
                </div>
                <DropdownResponsiveButton options={options} propButtons={buttons} handleSelect={handleActiveTime} />
            </div>
            <PortChart liquidityData={liquidityData} />
        </div>
    )
}

export default StakingChart;
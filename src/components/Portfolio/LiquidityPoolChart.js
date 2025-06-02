import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { useState, useRef, useEffect } from "react";
import LiquidityTokenCard from "../Liquidity/liquidityTokenCard";
import LiquidityTokenRange from "../Liquidity/liquidityTokenRange";
const LiquidityPoolChart = ({ info, setInfo, tokens }) => {
  echarts.use([LineChart]);

  const [priceRange, setPriceRange] = useState('full');
  const currentPrice = '1.0005';
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  const range = useRef(null);
  const [thumbState, setThumbState] = useState({ left: 0, right: 100 });
  const leftThumbRef = useRef(null);
  const rightThumbRef = useRef(null);
  const trackRef = useRef(null);

  const handleThumbDrag = (e, side) => {
    const track = trackRef.current.getBoundingClientRect();
    const position = Math.min(Math.max(0, ((e.clientX - track.left) / track.width) * 100), 100);

    if (side === 'left' && position < thumbState.right - 1) {
      setThumbState(prev => ({ ...prev, left: position }));
    }
    if (side === 'right' && position > thumbState.left + 1) {
      setThumbState(prev => ({ ...prev, right: position }));
    }
  };
  useEffect(() => {
    if (range.current) {
      range.current.style.left = `${minVal}%`;
      range.current.style.width = `${maxVal - minVal}%`;
    }
  }, [minVal, maxVal]);
  return (
    <div className="w-full h-full rounded-2xl flex flex-col lg:flex-row justify-between gap-10">
      <LiquidityTokenCard info={info} setInfo={setInfo} tokens={tokens} />
      <LiquidityTokenRange info={info} setInfo={setInfo} />
    </div >
  );
};

export default LiquidityPoolChart;

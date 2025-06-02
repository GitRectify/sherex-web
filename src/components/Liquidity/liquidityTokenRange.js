import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import { useState, useRef, useEffect } from "react";
const LiquidityTokenRange = ({ info, setInfo }) => {
  echarts.use([LineChart]);
  const { token0, token1, range: rangePercentage, amount0, amount1 } = info;
  const [priceRange, setPriceRange] = useState(rangePercentage);

  const price = amount1 > 0 ? amount0 / amount1 : 0;
  const currentPrice = token0.address && token1.address && amount0 !== 0 && amount1 !== 0 ? (token0.address.toLowerCase() < token1.address.toLowerCase() ? 1 / price : price) : 0;

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

  useEffect(() => {
    handlePriceRangeChange(rangePercentage);
  }, [token0, token1, amount0, amount1])

  // Update price range based on selected percentage
  const handlePriceRangeChange = (range) => {
    setPriceRange(range);

    let minVal = 0;
    let maxVal = 0;
    switch (range) {
      case 10:
        setMinVal((currentPrice * 0.9).toFixed(2));  // -10%
        setMaxVal((currentPrice * 1.1).toFixed(2));  // +10%
        minVal = (currentPrice * 0.9).toFixed(2);
        maxVal = (currentPrice * 1.1).toFixed(2);
        break;
      case 20:
        setMinVal((currentPrice * 0.8).toFixed(2));  // -20%
        setMaxVal((currentPrice * 1.2).toFixed(2));  // +20%
        minVal = (currentPrice * 0.8).toFixed(2);
        maxVal = (currentPrice * 1.2).toFixed(2);
        break;
      case 50:
        setMinVal((currentPrice * 0.5).toFixed(2));  // -50%
        setMaxVal((currentPrice * 1.5).toFixed(2));  // +50%
        minVal = (currentPrice * 0.5).toFixed(2);
        maxVal = (currentPrice * 1.5).toFixed(2);
        break;
      case 100:
        setMinVal(0);  // Minimum possible
        setMaxVal((currentPrice * 2).toFixed(2));  // 500% of current price
        minVal = 0;
        maxVal = (currentPrice * 2).toFixed(2);
        break;
      default:
        break;
    }

    setInfo(prev => ({ ...prev, range: range, minVal:  minVal, maxVal: maxVal }));
  };

  // Update handlers for min and max price buttons
  const handleMinPriceChange = (amount) => {
    const currentValue = parseFloat(minVal) || 0;
    let newValue;

    if (amount > 0) {
      // Increase by 1% of current price
      newValue = currentValue + (currentPrice * 0.01);
    } else {
      // Decrease by 1% of current price
      newValue = currentValue - (currentPrice * 0.01);
    }

    // Ensure newValue doesn't go below 0 or above current price
    newValue = Math.max(0, Math.min(newValue, currentPrice * 0.99));  // Keep below current price
    setMinVal(newValue);
    setInfo(prev => ({ ...prev, minVal:  newValue}));
    setPriceRange('custom');  // Switch to custom range
  };

  const handleMaxPriceChange = (amount) => {
    const currentValue = parseFloat(maxVal) || currentPrice;
    let newValue;

    if (amount > 0) {
      // Increase by 1% of current price
      newValue = currentValue + (currentPrice * 0.01);
    } else {
      // Decrease by 1% of current price
      newValue = currentValue - (currentPrice * 0.01);
    }

    // Ensure newValue doesn't go below 101% of current price
    newValue = Math.max(currentPrice * 1.01, newValue);
    setMaxVal(newValue);
    setInfo(prev => ({ ...prev, maxVal:  newValue}));
    setPriceRange('custom');  // Switch to custom range
  };

  // Input change handlers with validation
  const handleMinInputChange = (e) => {
    let strValue = e.target.value;
    let match = strValue.match(/\d+(\.\d*)?/);
    let value = match ? match[0] : "0";
    console.log(value);
    // Ensure min value is:
    // 1. Not negative
    // 2. Not above 99% of current price
    // 3. Not above max value
    const newValue = Math.max(0, Math.min(
      Number(value),
      currentPrice * 0.99,  // 99% of current price
      maxVal - 1  // At least 1 less than max value
    ));

    setMinVal(newValue);
    setPriceRange('custom');
  };

  const handleMaxInputChange = (e) => {
    let strValue = e.target.value;
    let match = strValue.match(/\d+(\.\d*)?/);
    let value = match ? match[0] : "0";

    // Ensure max value is:
    // 1. At least 101% of current price
    // 2. Not below min value
    // 3. Not above 500% of current price
    const newValue = Math.max(
      currentPrice * 1.01,  // 101% of current price
      Math.min(
        Number(value),
        currentPrice * 5,  // 500% of current price
        minVal + 1  // At least 1 more than min value
      )
    );

    setMaxVal(newValue);
    setPriceRange('custom');
  };

  return (
    <div className="flex flex-col gap-4 w-full relative">
      {/* Range Slider */}
      <img
        src="/static/images/icons/drag-background.svg"
        className="w-full h-full object-cover"
        alt="drag background"
      />
      <div className="relative mt-4 w-full">
        <div className="relative h-1" ref={trackRef}>
          {/* Base Track */}
          {/* <div className="absolute w-full h-1 rounded-lg bg-white bg-opacity-20" /> */}

          {/* Selected Range */}
          {/* <div
            className="absolute h-2 rounded-lg bg-[#F3BA2F]"
            style={{
              left: `${thumbState.left}%`,
              width: `${thumbState.right - thumbState.left}%`
            }}
          /> */}

          {/* Left Thumb */}
          {/* <div
            ref={leftThumbRef}
            className="absolute rounded-full bottom-0 -mt-1 cursor-pointer flex items-center justify-center"
            style={{ left: `${thumbState.left}%` }}
            onMouseDown={(e) => {
              const moveHandler = (e) => handleThumbDrag(e, 'left');
              const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
              };
              document.addEventListener('mousemove', moveHandler);
              document.addEventListener('mouseup', upHandler);
            }}
          >
            <img
              src="/static/images/icons/drag-left.svg"
              className="w-full h-full cursor-w-resize"
              alt="drag left"
            />
          </div> */}

          {/* Right Thumb */}
          {/* <div
            ref={rightThumbRef}
            className="absolute rounded-full bottom-0 -mt-1 cursor-pointer flex items-center justify-center"
            style={{ left: `${Math.min(thumbState.right - 4, 100)}%` }}
            onMouseDown={(e) => {
              const moveHandler = (e) => handleThumbDrag(e, 'right');
              const upHandler = () => {
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
              };
              document.addEventListener('mousemove', moveHandler);
              document.addEventListener('mouseup', upHandler);
            }}
          >
            <img
              src="/static/images/icons/drag-right.svg"
              className="w-full h-full cursor-e-resize"
              alt="drag right"
            />
          </div> */}
        </div>
      </div>
      {/* <img
        src="/static/images/icons/drag-background.svg"
        className="absolute w-full -top-[160px] lg:-top-[106px] cursor-w-resize"
        alt="drag left"
      /> */}
      <div className="flex flex-col justify-between items-center w-full bg-white bg-opacity-20 rounded-2xl py-2">
        <p className="text-white">Current Price: </p>
        <p className="text-white text-lg sm:text-2xl">{currentPrice} {token0.symbol} per {token1.symbol}</p>
      </div>
      <div className="flex justify-between items-center gap-8 max-sm:flex-col">
        {/* Min Price Controls */}
        <div className="flex flex-col justify-between items-center w-full lg:w-1/2 bg-white bg-opacity-20 rounded-2xl py-2">
          <p className="text-white">Min Price: </p>
          <div className="flex items-center gap-2 mt-2 px-6">
            <button
              onClick={() => handleMinPriceChange(-1)}
              className="w-5 h-5 rounded-full text-[#F3BA2F] border border-[#F3BA2F] flex items-center justify-center hover:opacity-80"
            >
              <span className="flex justify-center items-center mb-1">-</span>
            </button>
            <input
              type="number"
              className="w-14 xl:w-20 bg-transparent text-white text-2xl text-center focus:outline-none"
              value={Number(minVal).toFixed(2)}
              // onChange={handleMinInputChange}
            />
            <button
              onClick={() => handleMinPriceChange(1)}
              className="w-5 h-5 rounded-full text-[#F3BA2F] border border-[#F3BA2F] flex items-center justify-center hover:opacity-80"
            >
              <span className="flex justify-center items-center mb-1">+</span>
            </button>
          </div>
          <p className="text-white text-sm">{token0.symbol} per {token1.symbol}</p>
        </div>
        {/* Max Price Controls */}
        <div className="flex flex-col justify-between items-center w-full lg:w-1/2 bg-white bg-opacity-20 rounded-2xl py-2">
          <p className="text-white">Max Price: </p>
          <div className="flex items-center gap-2 mt-2 px-6">
            <button
              onClick={() => handleMaxPriceChange(-1)}
              className="w-5 h-5 rounded-full text-[#F3BA2F] border border-[#F3BA2F] flex items-center justify-center hover:opacity-80"
            >
              <span className="flex justify-center items-center mb-1">-</span>
            </button>
            <input
              type="number"
              className="xl:w-20 w-14 bg-transparent text-white text-2xl text-center focus:outline-none"
              value={Number(maxVal).toFixed(2)}
              // onChange={handleMaxInputChange}
            />
            <button
              onClick={() => handleMaxPriceChange(1)}
              className="w-5 h-5 rounded-full text-[#F3BA2F] border border-[#F3BA2F] flex items-center justify-center hover:opacity-80"
            >
              <span className="flex justify-center items-center mb-1">+</span>
            </button>
          </div>
          <p className="text-white text-sm">{token0.symbol} per {token1.symbol}</p>
        </div>
      </div>
      {/* Price Range Buttons */}
      <div className="flex w-full justify-between items-center">
        {[
          { value: 10, label: '10%' },
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 100, label: 'Full Range' }
        ].map((range) => (
          <button
            key={range.value}
            onClick={() => handlePriceRangeChange(range.value)}
            className={`px-4 py-2 rounded-xl border ${priceRange === range.value
              ? 'bg-gradient-to-r from-[#CF7D33] to-[#F3BA2F] text-white'
              : 'border-[#CF7D33] text-[#CF7D33]'
              }`}
          >
            {range.label}
          </button>
        ))}
      </div>

    </div>

  );
};

export default LiquidityTokenRange;

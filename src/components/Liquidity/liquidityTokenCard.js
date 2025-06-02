import { useEffect, useState } from "react";
import LiquidityCardGroup from "../Charts/LiquidityCardGroup";

const LiquidityTokenCard = ({ info, setInfo, tokens }) => {
  const [activeFee, setActiveFee] = useState('0.25');

  const feeTiers = [
    { rate: '0.01', desc: '0% Pick' },
    { rate: '0.05', desc: '0% Pick' },
    { rate: '0.25', desc: '100% Pick' },
    { rate: '1', desc: '0% Pick' }
  ];

  useEffect(() => {
    setInfo(prev => ({ ...prev, fee: activeFee }));
  }, [activeFee])

  const getButtonStyles = (isActive) => ({
    background: isActive
      ? 'linear-gradient(to right, #CF7D33, #F3BA2F)'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
  });

  const handleChangeFee = (fee) => {
    setActiveFee(fee);
  }

  return (
    <div className="flex flex-col py-6 w-full">
      <p className="text-white">Choose Token Pair and Deposit Amount</p>
      <LiquidityCardGroup info={info} setInfo={setInfo} tokens={tokens} />
      <p className="text-white mt-4">
        Fee's tier - <span className="text-[#CF7D33]">{activeFee}% Fee Tier</span>
      </p>
      
      <div className="flex justify-between max-sm:flex-wrap gap-4 mt-2">
        {feeTiers.map((fee, index) => {
          const isActive = activeFee === fee.rate;
          return (
            <div
              key={index}
              onClick={() => handleChangeFee(fee.rate)}
              className={`
                flex flex-col w-[115px] p-4 rounded-xl cursor-pointer 
                transition-all border justify-center items-center gap-2
                ${isActive ? 'border-black' : 'border-transparent hover:border-[#CF7D33]'}
              `}
              style={getButtonStyles(isActive)}
            >
              <p className={`text-lg ${isActive ? 'text-black' : 'text-white'}`}>
                {fee.rate}%
              </p>
              <div className={`
                flex justify-center items-center rounded-lg border p-2
                ${isActive ? 'text-black border-black' : 'text-[#CF7D33] border-[#CF7D33]'}
              `}>
                <p className="text-sm">{fee.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-white mt-4">Pool Lock(optional)</p>
      <div className="relative flex items-center mt-2">
        <input
          type="number"
          placeholder="Enter Lock Period Months"
          className="bg-[#FFFFFF] bg-opacity-20 text-white px-4 py-2 rounded-xl 
                   focus:outline-none focus:border-[#F3BA2F] w-full"
        />
      </div>
    </div>
  );
};

export default LiquidityTokenCard;
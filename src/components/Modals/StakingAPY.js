import { useState, useEffect } from "react";
const StakingAPY = ({ title, value, onChange, options }) => {
    const [isCustom, setIsCustom] = useState(false);
    const [customValue, setCustomValue] = useState('');

    const handleValueChange = (newValue, isCustomInput = false) => {
        if (isCustomInput) {
            setIsCustom(true);
            setCustomValue(newValue);
            onChange(newValue);
        } else {
            setIsCustom(false);
            setCustomValue('');
            onChange(newValue);
        }
    };

    return (
        <div className="mb-6">
            <div className="flex w-full justify-between items-center">
                <div className="text-white mb-4 w-full">{title}</div>
                <div className="items-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="6.10621" cy="3.94434" r="0.431159" fill="white" />
                        <path d="M5.67511 5.23785H6.10627V8.25597M10.4179 6.10017C10.4179 8.4814 8.4875 10.4118 6.10627 10.4118C3.72504 10.4118 1.79468 8.4814 1.79468 6.10017C1.79468 3.71894 3.72504 1.78857 6.10627 1.78857C8.4875 1.78857 10.4179 3.71894 10.4179 6.10017Z" stroke="white" stroke-width="0.646739" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="flex gap-2 items-center justify-between max-md:flex-wrap">
                {options.map((option, index) => (
                    <div key={option} className="relative">
                        <button
                            onClick={() => handleValueChange(option)}
                            className={`py-2 rounded-lg border transition-all w-[60px] sm:w-[80px] ${value === option && !isCustom
                                ? 'bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] text-black border-transparent'
                                : 'border-white border-opacity-20 text-white hover:opacity-70'
                                }`}
                        >
                            {option}
                        </button>
                    </div>
                ))}
                <span className="text-white">%</span>
            </div>
        </div >
    );
};

export default StakingAPY;

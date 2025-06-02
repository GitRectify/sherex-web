import { useState, useEffect } from "react";

const SlippageSelectorSwap = ({ title, value, onChange, options }) => {
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
        <div className="mb-6 max-sm:px-4">
            <div className="text-white mb-4">{title}</div>
            <div className="flex gap-2 items-center justify-between max-md:flex-wrap">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleValueChange(option)}
                        className={`px-4 py-2 rounded-lg border transition-all ${value === option && !isCustom
                            ? 'bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] text-black border-transparent'
                            : 'border-white border-opacity-20 text-white hover:opacity-70'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SlippageSelectorSwap;

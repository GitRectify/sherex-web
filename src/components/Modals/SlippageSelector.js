import { useState, useEffect } from "react";

const SlippageSelector = ({ title, value, onChange, options }) => {
    const [isCustom, setIsCustom] = useState(false);
    const [customValue, setCustomValue] = useState('');

    // Update customValue when value changes from outside
    useEffect(() => {
        if (!options.includes(value)) {
            setIsCustom(true);
            setCustomValue(value);
        } else {
            setIsCustom(false);
            setCustomValue(value);
        }
    }, [value, options]);

    const handleValueChange = (newValue, isCustomInput = false) => {
        if (isCustomInput) {
            setIsCustom(true);
            setCustomValue(newValue);
            onChange(newValue);
        } else {
            setIsCustom(false);
            setCustomValue(newValue);
            onChange(newValue);
        }
    };

    return (
        <div className="mb-6 max-sm:px-4">
            <div className="text-white mb-4">{title}</div>
            <div className="flex gap-1 items-center justify-between flex-wrap">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleValueChange(option)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                            value === option && !isCustom
                                ? 'bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] text-black border-transparent'
                                : 'border-white border-opacity-20 text-white hover:opacity-70'
                        }`}
                    >
                        {option}%
                    </button>
                ))}

                <div className="relative flex items-center justify-between mr-4">
                    <input
                        type="number"
                        value={customValue}
                        onChange={(e) => handleValueChange(e.target.value, true)}
                        placeholder="Custom"
                        min="0"
                        max="100"
                        step="0.1"
                        className={`w-24 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg 
                            border ${isCustom ? 'border-[#F3BA2F]' : 'border-white'} 
                            focus:outline-none focus:border-[#F3BA2F]`}
                    />
                    <span className="absolute -right-4 text-white">%</span>
                </div>
            </div>
        </div>
    );
};

export default SlippageSelector;
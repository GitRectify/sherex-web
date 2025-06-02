import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";

const DropdownResponsiveButton = (props) => {
  const { options, propButtons, handleSelect } = props;
  const [activeTime, setActiveTime] = useState('1m');
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const defaultButtons = [
    { value: '24h', label: 'Volume' },
    { value: '1w', label: 'Liquidity' },
    { value: '1m', label: 'Fees' },
    { value: 'TVL', label: 'TVL' }
  ];
  const buttons = propButtons || defaultButtons;
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleActiveTime = (value) => {
    setActiveTime(value);
    handleSelect(value);
  }
  return (
    <>
      <div className="hidden sm:flex gap-2 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-xl px-1 py-[1px] items-center">
        {buttons.map((button) => (
          <button
            key={button.value}
            onClick={() => handleActiveTime(button.value)}
            className={`px-3 py-[1px] rounded-lg text-sm ${activeTime === button.value
                ? 'text-white'
                : 'text-white hover:opacity-70'
              }`}
            style={
              activeTime === button.value
                ? { background: 'rgba(255, 255, 255, 0.2)' }
                : {}
            }
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className="sm:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-xl"
        >
          <span className="text-white text-sm">
            {options.find(opt => opt.value === activeTime)?.label || 'Select'}
          </span>
          <div className="flex w-8 h-8 items-center justify-end">
            <svg
              className={`fill-white rotate-90`}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 511.93" width="8" ><path d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"></path></svg>
          </div>
        </button>

        {showDropdown && (
          <div className="absolute right-2 top-full mt-2 w-40 bg-white bg-opacity-20 rounded-xl border border-white border-opacity-20 shadow-lg z-50">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  handleActiveTime(option.value);
                  setShowDropdown(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-white hover:bg-opacity-20 ${activeTime === option.value ? 'text-[#F3BA2F]' : 'text-white'
                  }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
export default DropdownResponsiveButton
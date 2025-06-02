import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as SVG from "../../common/IMG/Images"
const LiquidityTableHeader = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('concentrated');
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <div className="hidden lg:flex justify-between items-center">
                <div className="flex gap-4 items-center ">
                    {/* <p
                        onClick={() => setActiveTab('concentrated')}
                        className={`font-semibold text-base cursor-pointer ${activeTab === 'concentrated' ? 'text-[#F3BA2F]' : 'text-white'
                            }`}
                    >
                        {t('liquidityTable.concentrated')}
                    </p>
                    <p
                        onClick={() => setActiveTab('standard')}
                        className={`font-semibold text-base cursor-pointer ${activeTab === 'standard' ? 'text-[#F3BA2F]' : 'text-white'
                            }`}
                    >
                        {t('liquidityTable.standard')}
                    </p>
                    <p
                        onClick={() => setActiveTab('all')}
                        className={`font-semibold text-base cursor-pointer ${activeTab === 'all' ? 'text-[#F3BA2F]' : 'text-white'
                            }`}
                    >
                        {t('liquidityTable.all')}
                    </p> */}
                    <div className="flex justify-center items-center gap-4">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder={t("nav.search")}
                                className="bg-[#FFFFFF] bg-opacity-20 text-white pl-10 pr-4 py-1 rounded-2xl border border-white focus:outline-none focus:border-[#F3BA2F] w-[300px]"
                            />
                            <img
                                src="/static/images/icons/search.svg"
                                className="absolute left-3 w-4 h-4"
                                alt="search"
                            />
                        </div>
                        {/* <img
                            src="/static/images/icons/setting1.svg"
                            className="w-6 h-6 cursor-pointer"
                            alt="search"
                        /> */}
                    </div>
                </div>
                <div className="">
                    <Link to="/Liquidity/pool/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/0x55d398326f99059ff775485246999027b3197955" className="px-4 py-1 rounded-lg text-black" style={{
                        background: 'linear-gradient(to right, #CF7D33, #F3BA2F)'
                    }}>{t("liquidityTable.create")}</Link>
                </div>
            </div>
            <div className="flex flex-col lg:hidden gap-5 w-full">
                <div className="flex justify-between gap-2 sm:gap-4 items-center relative">
                    {/* <div className="flex items-center gap-1 sm:gap-4">
                        <div className="flex justify-between relative w-[160px] bg-gray-400 bg-opacity-20 border border-white border-opacity-20 py-1 px-2 rounded-xl">
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex justify-between w-full items-center lg:gap-2 cursor-pointer"
                            >
                                <p className={`font-semibold text-base 'text-[#F3BA2F]'`}>
                                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                </p>
                                <div className="flex w-8 h-8 items-center justify-end">
                                    <svg
                                        className={`fill-white rotate-90`}
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 511.93" width="8" ><path d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"></path></svg>
                                </div>
                            </div>

                            {showDropdown && (
                                <div className="absolute top-full mt-2 w-48 bg-[#142028] rounded-lg shadow-lg border border-gray-700 z-50">
                                    <div
                                        onClick={() => {
                                            setActiveTab('concentrated');
                                            setShowDropdown(false);
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#1A1A1A] ${activeTab === 'concentrated' ? 'text-[#F3BA2F]' : 'text-white'
                                            }`}
                                    >
                                        Concentrated
                                    </div>
                                    <div
                                        onClick={() => {
                                            setActiveTab('standard');
                                            setShowDropdown(false);
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#1A1A1A] ${activeTab === 'standard' ? 'text-[#F3BA2F]' : 'text-white'
                                            }`}
                                    >
                                        Standard
                                    </div>
                                    <div
                                        onClick={() => {
                                            setActiveTab('all');
                                            setShowDropdown(false);
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-[#1A1A1A] ${activeTab === 'all' ? 'text-[#F3BA2F]' : 'text-white'
                                            }`}
                                    >
                                        All
                                    </div>
                                </div>
                            )}
                        </div>
                        <img
                            src="/static/images/icons/setting1.svg"
                            className="w-8 h-8 cursor-pointer"
                            alt="setting"
                        />
                    </div> */}
                    <div className="w-full flex justify-end">
                        <Link to="/Liquidity/pool/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c/0x55d398326f99059ff775485246999027b3197955" className="px-4 py-2 rounded-lg text-black" style={{
                            background: 'linear-gradient(to right, #CF7D33, #F3BA2F)'
                        }}>Create</Link>
                    </div>
                </div>
                <div className="relative flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Search All"
                        className="bg-[#FFFFFF] bg-opacity-20 text-white pl-2 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#F3BA2F] w-full"
                    />
                    <img
                        src="/static/images/icons/search.svg"
                        className="absolute right-3 w-4 h-4"
                        alt="search"
                    />
                </div>
            </div>
        </>
    )
}

export default LiquidityTableHeader;
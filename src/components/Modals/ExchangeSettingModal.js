import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import * as IMG from "../../../src/common/IMG/Images"
import { showWalletConnectModalDesk } from "../../store/slices/wallet";
import WalletConnectModalDesk from "../../components/header/WalletConnectModal/Desk";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import ModalSetting from "../Modals/ModalSetting";
import SlippageSelector from "../Modals/SlippageSelector";
import * as SVG from "../../common/Icons";

const ExchangeSettingModal = () => {
    const { t, i18n } = useTranslation();
    const [swapSlippage, setSwapSlippage] = useState('0.5');
    const [liquiditySlippage, setLiquiditySlippage] = useState('0.5');
    
    // Add direction class based on language
    const isRTL = i18n.language === 'ar';
    const containerClass = `${isRTL ? 'rtl' : 'ltr'}`;
    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
        // Force re-render to update direction
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };
    return (
        <div className={containerClass} dir={isRTL ? 'rtl' : 'ltr'}>
            <SlippageSelector
                title={t("exchangeModal.swapSlippage")}
                value={swapSlippage}
                onChange={setSwapSlippage}
                options={['0.5', '1.0', '3.0']}
            />
            <SlippageSelector
                title={t("exchangeModal.slippageTolerance")}
                value={liquiditySlippage}
                onChange={setLiquiditySlippage}
                options={['0.5', '1.0', '3.0']}
            />
            <div className="flex justify-between w-full max-sm:px-4">
                <div className="text-white mb-4">{t("exchangeModal.language")}</div>
                <div className={`relative w-[120px] ${isRTL ? 'text-right' : 'text-left'}`}>
                    <select
                        value={i18n.language}
                        onChange={handleLanguageChange}
                        className={`w-full bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg 
                            border border-white focus:outline-none focus:border-[#F3BA2F]
                            appearance-none cursor-pointer ${isRTL ? 'pr-4' : 'pl-4'}`}
                    >
                        <option value="en" className="bg-black">English</option>
                        <option value="ar" className="bg-black">العربية</option>
                    </select>
                    <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 pointer-events-none`}>
                        <SVG.ArrowDown />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExchangeSettingModal;

import ModalSetting from "../Modals/ModalSetting"
import SlippageSelector from "../Modals/SlippageSelector";
import SlippageSelectorSwap from "../Modals/SlippageSelectorSwap";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const SwapSettingModal = ({ 
  isSettingModal, 
  setIsSettingModal, 
  swapSlippage, 
  setSwapSlippage,
  liquiditySlippage, 
  setLiquiditySlippage,
  txDeadline, 
  setTxDeadline 
}) => {
  const { t } = useTranslation();

  const [inSwapSlippage, setInSwapSlippage] = useState(swapSlippage);
  const [inLiquiditySlippage, setInLiquiditySlippage] = useState(liquiditySlippage);
  const [inTxDeadline, setInTxDeadline] = useState(txDeadline);


  const handleTxDeadlineChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setInTxDeadline(value);
    }
  };

  const handleApply = () => {
    setSwapSlippage(inSwapSlippage);
    setLiquiditySlippage(inLiquiditySlippage);
    setTxDeadline(inTxDeadline);
    setIsSettingModal(false);
  }

  return (
    <ModalSetting
      isOpen={isSettingModal}
      onClose={() => setIsSettingModal(false)}
      title={t("swapModal.title")}
    >
      <div>
        <SlippageSelectorSwap
          title={t("swapModal.swapSlippage")}
          value={inSwapSlippage}
          onChange={setInSwapSlippage}
          options={[t("swapModal.default"), t("swapModal.instant"), t("swapModal.standard"), t("swapModal.fast")]}
        />
        <SlippageSelector
          title={t("swapModal.liquiditySlippage")}
          value={inLiquiditySlippage}
          onChange={setInLiquiditySlippage}
          options={['0.5', '1.0', '3.0']}
        />
        <div className="max-sm:px-4">
          <p className="text-white">{t("swapModal.txDeadline")}</p>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-4">
              <input
                type="number"
                value={inTxDeadline}
                onChange={handleTxDeadlineChange}
                min="0"
                className="w-24 bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg 
                 border border-white focus:outline-none focus:border-[#F3BA2F]"
              />
              <span className="text-white">{t("swapModal.min")}</span>
            </div>

            <button
              onClick={() => setInTxDeadline('0')}
              className="px-4 py-2 rounded-lg border border-white border-opacity-20 text-white 
               hover:bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] 
               hover:text-black hover:border-transparent transition-all"
            >
              {t("swapModal.reset")}
            </button>
          </div>
          <button className="w-full bg-black hover:bg-opacity-60 mt-6 bg-opacity-40 rounded-xl py-3 w-[400px]" onClick={handleApply}>{t("newTokenModal.apply")}</button>
        </div>
      </div>
    </ModalSetting>
  );
};

export default SwapSettingModal;
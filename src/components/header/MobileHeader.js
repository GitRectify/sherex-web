import { useState } from "react";
import ModalSetting from "../Modals/ModalSetting";
import ExchangeSettingModal from "../Modals/ExchangeSettingModal";
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { formatAddress } from "../../utils";
import { useTranslation } from 'react-i18next';
import NewTokenModal from "../Modals/NewTokenModal";
import { PlusImg } from "../../common/Icons";

const MobileHeader = () => {
  const { open } = useAppKit();
  const onConnect = () => {
    open();
  }
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isTokenModal, setIsTokenModal] = useState(false);
  const { address, isConnected } = useAppKitAccount();
  const { t, i18n } = useTranslation();

  return (
    <div className="lg:hidden fixed top-0 w-full  z-[99999] flex justify-between items-center py-4 px-4 lg:px-10 bg-[#333333]">
      <div className="flex items-center justify-between gap-6 w-full">
        <div className="relative flex items-center w-[180px] sm:w-full">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#FFFFFF] bg-opacity-20 text-white pl-10 pr-4 py-1 rounded-full border border-white focus:outline-none focus:border-[#F3BA2F] w-[130px] sm:w-full"
          />
          <img
            src="/static/images/icons/search.svg"
            className="absolute left-3 w-4 h-4"
            alt="search"
          />
        </div>
        <div className="flex gap-2 w-full justify-end">
          <div className="flex items-center justify-center gap-2">
            <div
              className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md p-1"
              onClick={() => setIsTokenModal(true)}
            >
              <img
                src={PlusImg}
                className="w-6 h-6"
                alt="taptool"
              />
            </div>
            <div
              className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md p-1"
              onClick={() => setIsSettingModal(true)}
            >
              <img
                src="/static/images/icons/setting.svg"
                className="w-6 h-6"
                alt="taptool"
              />
            </div>
          </div>
          <ModalSetting
            isOpen={isTokenModal}
            onClose={() => setIsTokenModal(false)}
            title={t("newTokenModal.title")}
            isSmall={true}
          >
            <NewTokenModal />
          </ModalSetting>
          <ModalSetting
            isOpen={isSettingModal}
            onClose={() => setIsSettingModal(false)}
            title={t("exchangeModal.title")}
            isSmall={true}
          >
            <ExchangeSettingModal />
          </ModalSetting>
          <div
            className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md py-1 px-3 truncate"
            onClick={onConnect}
          >
            <img
              src="/static/images/icons/Apple.svg"
              className="w-6 h-6"
              alt="taptool"
            />
            {isConnected ? formatAddress(address) : t("nav.wallet")}
          </div>
        </div>
      </div>
    </div >
  );
};
export default MobileHeader;
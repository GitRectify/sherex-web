import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { formatAddress } from '../../utils'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useLocation } from "react-router-dom";
import ModalSetting from "../Modals/ModalSetting";
import ExchangeSettingModal from "../Modals/ExchangeSettingModal";
import NewTokenModal from "../Modals/NewTokenModal";
import { PlusImg } from "../../common/Icons";
const TopNavbar = () => {

  const location = useLocation();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [menu, setMenu] = useState();
  const { t, i18n } = useTranslation();
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isTokenModal, setIsTokenModal] = useState(false);
  useEffect(() => {
    var current = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );
    setMenu(current + "home");
  }, [
    window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    )
  ]);

  const onConnect = () => {
    open();
  }
  return (
    <div
      className={`fixed top-0  z-[100] pt-3 bg-[#FFFFFF] bg-opacity-20    overflow-hidden flex justify-center w-full h-[70px] `}
      id="Navbar"
    >
      {/* Navbar header */}
      {/* Navbar Body */}
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-between items-center w-[1290px] max-[1390px]:px-10  gap-6">

          <div className="flex items-center justify-between gap-10 xl:gap-14">
            <Link
              to="/"
              className={`cursor-pointer hover:opacity-70 ${location.pathname === '/'
                ? 'text-[#F3BA2F]'
                : 'text-white'
                }`}
            >
              {t('nav.swap')}
            </Link>
            <Link
              to="/liquidity"
              className={`cursor-pointer hover:opacity-70 ${location.pathname === '/liquidity'
                ? 'text-[#F3BA2F]'
                : 'text-white'
                }`}
            >
              {t('nav.liquidity')}
            </Link>
            <Link
              to="/tokens"
              className={`cursor-pointer hover:opacity-70 ${location.pathname === '/tokens'
                ? 'text-[#F3BA2F]'
                : 'text-white'
                }`}
            >
              {t('nav.tokens')}
            </Link>
            <Link
              to="/staking"
              className={`cursor-pointer hover:opacity-70 ${location.pathname === '/staking'
                ? 'text-[#F3BA2F]'
                : 'text-white'
                }`}
            >
              {t('nav.staking')}
            </Link>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={t('liquidityTable.search')}
              className="bg-[#FFFFFF] bg-opacity-20 text-white pl-10 pr-4 py-1 rounded-full border border-white focus:outline-none focus:border-[#F3BA2F] w-[300px] xl:w-[340px]"
            />
            <img
              src="/static/images/icons/search.svg"
              className="absolute left-3 w-4 h-4"
              alt="search"
            />
          </div>
          <div className="flex gap-4">
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
            <div className="flex items-center justify-end gap-6">
              <div
                className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-[#F3BA2F] to-[#CF7D33] hover:opacity-70 rounded-md py-1 px-3"
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


          {/* <Modal
          isOpen={showwalletconnectmodaldesk}
          onRequestClose={handleShowModal}
          className="custom-modalcontent"
          overlayClassName="custom-modaloverlay"
        >
          <WalletConnectModalDesk />
        </Modal> */}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;

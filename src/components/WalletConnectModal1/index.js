import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { showWalletConnectModal } from "../../store/slices/wallet";
import WalletConnectModal2 from "../WalletConnectModal2";

import * as SVG from "../../common/Icons";
import walletLists from "./Data";

const WalletConnectModal = () => {
  const dispatch = useDispatch();

  const [showNextModal, setShowNextModal] = useState(false);

  const nextModal = () => {
    setShowNextModal(true);
  };

  return (
    <div className="">
      {showNextModal === true ? (
        <div
          id="modal"
          className="flex items-center justify-center w-full h-full fixed z-[1000] left-0 top-0 right-0 bottom-0 backdrop-blur-md inset-0 scale-100 transition-all duration-200"
        >
          <WalletConnectModal2 />
        </div>
      ) : ( "" )}
        <div className="relative flex flex-col items-center gap-2 md:w-[400px] overflow-x-auto md:h-fit w-full h-full bg-[#121218] bg-opacity-100 shadow-lg rounded-xl p-8">
          <div
            onClick={() => dispatch(showWalletConnectModal())}
            className="absolute top-3 right-3 flex items-center justify-center p-3 bg-black rounded-full"
          >
            <SVG.Close />
          </div>
          <div className="w-full mb-4">
            <span className="text-white text-lg font-semibold">
              Connect a wallet
            </span>
          </div>
          <div className="space-y-3">
            <div
              className="flex items-center w-[335px] h-[70px] bg-[#35373e] rounded-lg cursor-pointer box-content hover:shadow-md"
              onClick={() =>
                window.open(
                  "https://chromewebstore.google.com/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
                  "_blank"
                )
              }
            >
              <img
                src="/static/images/icons/eternl.webp"
                className="w-12 ml-4"
              />
              <span className="text-white ml-4">Eternl</span>
            </div>
            <div
              className="flex items-center w-[335px] h-[70px] bg-[#35373e] rounded-lg cursor-pointer"
              onClick={() =>
                window.open(
                  "https://chromewebstore.google.com/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
                  "_blank"
                )
              }
            >
              <img
                src="/static/images/icons/flint.webp"
                className="w-12 ml-4"
              />
              <span className="text-white ml-4">Flint</span>
            </div>
            <div
              className="flex items-center w-[335px] h-[70px] bg-[#35373e] rounded-lg cursor-pointer"
              onClick={nextModal}
            >
              <SVG.Rect />
              <span className="text-white ml-6">Other</span>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default WalletConnectModal;

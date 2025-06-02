import { useDispatch } from "react-redux";
import * as SVG from "../../../common/Icons";
import {
  showWalletConnectModalDesk,
  showWalletConnectModalMobile,
} from "../../../store/slices/wallet";

const WalletConnectModalDesk = () => {
  const dispatch = useDispatch();

  const handleShowModalDesk = () => {
    dispatch(showWalletConnectModalDesk());
  };

  const handleShowModalMobile = () => {
    dispatch(showWalletConnectModalMobile());
    dispatch(showWalletConnectModalDesk());
  };

  return (
    <div className="">
      <div className="relative flex flex-col items-center gap-2 md:w-[400px] overflow-x-auto md:h-fit w-full h-full bg-[#142028] bg-opacity-100 shadow-lg rounded-xl p-8">
        <div
          onClick={handleShowModalDesk}
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
            className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer box-content hover:shadow-md"
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
                "_blank"
              )
            }
          >
            <img src="/static/images/icons/eternl.webp" className="w-12 ml-4" />
            <span className="text-white ml-4">Eternl</span>
          </div>
          <div
            className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer"
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
                "_blank"
              )
            }
          >
            <img src="/static/images/icons/flint.webp" className="w-12 ml-4" />
            <span className="text-white ml-4">Flint</span>
          </div>
          <div
            className="flex items-center w-[335px] h-[70px] bg-[#3a4956] rounded-lg cursor-pointer"
            onClick={handleShowModalMobile}
          >
            <SVG.Rect />
            <span className="text-white ml-6">Other</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModalDesk;

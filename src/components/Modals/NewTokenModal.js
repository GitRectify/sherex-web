import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useActions } from "../../hooks/useActions";
import { toast } from "react-toastify";
import { isAddress } from "ethers";
import { useTranslation } from "react-i18next";

const NewTokenModal = ({ title }) => {
    const [address, setAddress] = useState("");
    const [tokens, setTokens] = useLocalStorage('tokens', []);
    const { getName, getDecimals, getSymbol } = useActions();
    const { t } = useTranslation();

    const handleAdd = async () => {
        if (!isAddress(address)) {
            toast.error(t("newTokenModal.errors.invalidAddress"), {
                position: "top-right",
                zIndex: 1000,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const name = await getName(address);
        const symbol = await getSymbol(address);
        const decimals = await getDecimals(address);

        const filteredToken = tokens.filter((token) => token.address == address.toLowerCase());

        if (filteredToken.length > 0) {
            toast.error(t("newTokenModal.errors.tokenAlreadyAdded"), {
                position: "top-right",
                zIndex: 1000,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }
        setTokens([...tokens, {
            address: address.toLowerCase(),
            name: name,
            symbol: symbol,
            decimals: Number(decimals)
        }])
        toast.success(t("newTokenModal.success.tokenAdded", { symbol: symbol }), {
            position: "top-right",
            zIndex: 1000,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    return (
        <div className="mb-6" dir="rtl">

            <div className="flex gap-2 items-center justify-between max-md:flex-wrap">
                <input
                    type="text"
                    defaultValue=""
                    placeholder={t("newTokenModal.enterAddress")}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`py-2 rounded-lg border transition-all w-full border-white text-center bg-transparent border-opacity-20 text-white hover:opacity-70`}
                >
                </input>
            </div>
            <button
                className="bg-black hover:bg-opacity-60 mt-6 bg-opacity-40 rounded-xl py-3 w-[400px]"
                onClick={handleAdd}
            >
                {t("newTokenModal.addToken")}
            </button>
        </div>
    );
};

export default NewTokenModal;

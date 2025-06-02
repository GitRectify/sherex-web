// import HeaderCurrency from "./HeaderCurrency";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
const MobileFooter = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 w-full  z-[99999] flex justify-between items-center py-4 px-2 sm:px-10 bg-[#333333]">
      <div className="flex items-center justify-between gap-10 w-full px-4">
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
    </div>
  );
};

export default MobileFooter;

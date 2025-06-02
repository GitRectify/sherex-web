import * as SVG from "../../common/Icons";
import { iUSD } from "../../common/IMG/Images";
import { EUR } from "../../common/IMG/Images";
import { ADA } from "../../common/IMG/Images";
import { USD } from "../../common/IMG/Images";
import { BTC } from "../../common/IMG/Images";
import { ETH } from "../../common/IMG/Images";
import { CAD } from "../../common/IMG/Images";
import ChartInforButton from "../../common/Button/ChartInforButton";
import { getTokenLogo } from "../../utils";
import { useEffect, useState } from "react";

import { staticTokens, WETH_ADDRESS } from "../../constants";


const ChartInforButtons = ({ info, setInfo, pairFor, tokens }) => {
  const [rotate, setRotate] = useState(false);
  const [isArrowDown, setIsArrowDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveButtons, setIsActiveButtons] = useState(false);

  console.log(info);

  let data = staticTokens.map((token, index) => {
    return {
      id: index,
      imgurl: token.logo? token.logo : ETH,
      active: false,
      ...token
    }
  });
  tokens && tokens.forEach((token, index) => {
    data.push({
      id: staticTokens.length + index,
      imgurl: getTokenLogo(token.address),
      active: false,
      ...token
    })
  })

  data = data.filter((d) => {
    if (pairFor === 0) return d.address !== info.token1.address;
    else if (pairFor === 1) return d.address !== info.token0.address;
  });

  const [dispValue, setDispValue] = useState(pairFor === 0? info.token0 : info.token1);
  const [menuItems, setMenuItems] = useState(data);
  const handleRotate = () => { setRotate(!rotate); }

  useEffect(() => {
    if (pairFor === 0 ) {
      const selectedToken0 = data.filter((d) => {
        return d.address === info.token0.address && d.isNative === info.token0.isNative;
      })
      if (selectedToken0.length > 0) {
        const selectedToken = selectedToken0[0];
        // if (selectedToken.address === WETH_ADDRESS.toLowerCase()) {
        //   selectedToken.isNative = false;
        //   selectedToken.symbol = 'WBNB';          
        // }
        setDispValue(selectedToken);
      }
    } else {
      const selectedToken1 = data.filter((d) => {
        return d.address === info.token1.address && d.isNative === info.token1.isNative;
      })
      if (selectedToken1.length > 0) {
        const selectedToken = selectedToken1[0];
        // if (selectedToken.address === WETH_ADDRESS.toLowerCase()) {
        //   selectedToken.isNative = false;
        //   selectedToken.symbol = 'WBNB';          
        // }
        setDispValue(selectedToken);
      }
    }
  }, [info])

  const handleArrowDown = () => {
    setIsArrowDown(!isArrowDown);
    setIsActiveButtons(!isActiveButtons);
  }
  const handleItem = (_idx) => {
    const newMenuItems = data.map((item, idx) => {
      if (_idx === idx) {
        item.active = true;
        setDispValue(item);
        if (pairFor === 0) {
          setInfo({ ...info, token0: item });
        } else {
          setInfo({ ...info, token1: item });
        }
      } else {
        item.active = false;
      }
      return item;
    });

    setMenuItems(newMenuItems);
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center items-start gap-2 cursor-pointer "
        onClick={handleArrowDown}
      >
        <div className={`flex items-center rounded-xl  ${rotate ? "order-1" : "order-2"} cursor-pointer`}>
          <div className="flex justify-start items-center relative">
            <img
              src={dispValue.imgurl}
              alt="iUSD"
              className="w-7 h-7 cursor-pointer "
            />
            <p className="text-lg font-normal text-white  px-2 py-1">{dispValue.symbol}</p>
            <div
              className={`transition-all duration-300 ${isArrowDown ? "rotate-180" : ""}`}>
              <SVG.ArrowDown />
            </div>
            <div className={`absolute left-0 top-[110%] w-full bg-[#142028] rounded-[10px] z-10 transition-all transform origin-top duration-200   ${isActiveButtons ? "scale-y-1 opacity-100" : "scale-y-0 opacity-0"}`}>
              {data.map((item, index) => {
                return (
                  <>
                    <ChartInforButton key={index} item={item} index={index} handleItem={handleItem}
                    />
                  </>
                )
              })}
              <div
                className={`flex items-center cursor-pointer px-2 py-1 gap-1 ${isActive ? "bg-[#24242c] " : ""}`}>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
export default ChartInforButtons
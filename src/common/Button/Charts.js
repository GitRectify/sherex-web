import { useState } from "react";
import { Link } from "react-router-dom"
const Chart = (props) => {
  const { menu } = props;
  return (
    <>
      <div
        className={`lg:px-4 px-2 lg:py-2  py-1 ${menu === "token" ? "bg-[#3a4956]  rounded-lg" : ""}  `}>
        <Link
          to="/charts/token"
          className={`lg:text-base text-xs  font-medium ${menu === "token" ? "text-white" : "text-[#9f9fa8] "} hover:text-white   h-fit transition-all duration-200 transform hover:scale-x-125 w-fit`}>Charts</Link>
      </div>
    </>
  )
}
export default Chart
const ProgressBar = (props) => {
  return (
    <div className="w-[120px] h-[5px] rounded-full bg-[#121218] float-right">
      <div className={`h-[5px] rounded-full ${props.color} float-right`} style={{width:`${props.width}%`}}></div>
    </div>
  )
}

export default ProgressBar;
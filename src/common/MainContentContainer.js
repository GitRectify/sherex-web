const MainContentContainer = (props) => {
  const { children } = props;
  return <div className="w-screen overflow-x-hidden">{children}</div>;
};

export default MainContentContainer;

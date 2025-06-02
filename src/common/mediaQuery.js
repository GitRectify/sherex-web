import useMediaQuery from "@mui/material/useMediaQuery";
const useMedia = () => {
    const useXSmall = useMediaQuery("(min-width: 540px)");
    const useIsSmall = useMediaQuery("(min-width: 640px)");
    const useIsMedium = useMediaQuery("(min-width: 860px)");
    const useIsLarge = useMediaQuery("(min-width: 1024px)");
    const useXlLarge = useMediaQuery("(min-width: 1280px)");
    const use2XlLarge = useMediaQuery("(min-width: 1536px)");
    return { use2XlLarge, useXSmall, useIsLarge, useIsSmall, useIsMedium, useXlLarge }
}
export default useMedia
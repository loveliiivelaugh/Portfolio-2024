import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";


const navToTop = () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
});
export const SmoothScroll = ({ children }: any) => {
    const location = useLocation();
    const navType = useNavigationType();

    useEffect(() => {
        if (navType !== 'POP') navToTop();
    }, [location]);
    
    return children;
}
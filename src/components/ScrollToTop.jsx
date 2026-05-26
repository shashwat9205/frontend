// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // This is the magic line
  }, [pathname]); // This runs every time the path changes

  return null;
};

export default ScrollToTop;

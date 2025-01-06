import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [sectionConfig, setSectionConfig] = useState([]);
  const [activeSection, setActiveSection] = useState("top-section");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => { //로딩 애니메이션 종료
    if(isLoaded) {
      document.body.style.overflow = "auto";
      
      const timer = setTimeout(() => {
        setHideLoading(true);
        window.dispatchEvent(new Event('scroll')); //useAnimation 미실행 방지
      }, 800);

      return () => clearTimeout(timer);
    } else{ //로딩중 스크롤 차단
      document.body.style.overflow = "hidden";
    }
  }, [isLoaded]);

  const SectionContextValue = {
    sectionConfig, setSectionConfig,
    activeSection, setActiveSection,
    isLoaded, setIsLoaded,
    hideLoading, setHideLoading,
    scrollDirection, setScrollDirection
	};

  return(
    <SectionContext.Provider value={SectionContextValue}>
      {children}
    </SectionContext.Provider>
  )
}

SectionProvider.propTypes = {
  children: PropTypes.node.isRequired
};
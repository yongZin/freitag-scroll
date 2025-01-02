import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [sectionConfig, setSectionConfig] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoading, setHideLoading] = useState(false);

  useEffect(() => { //로딩 애니메이션 종료
    if(isLoaded) {
      window.scrollTo(0, 1);

      const timer = setTimeout(() => {
        setHideLoading(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleBeforeUnload = () => { //새로고침 시 스크롤 최상단
      window.scrollTo(0, 0);
      if(sectionConfig) setIsLoaded(true);
    }

    if(sectionConfig.length > 0) setIsLoaded(true); //로드 완료시 로딩 종료

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sectionConfig]);

  const SectionContextValue = {
    sectionConfig, setSectionConfig,
    activeSection, setActiveSection,
    isLoaded, setIsLoaded,
    hideLoading, setHideLoading
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
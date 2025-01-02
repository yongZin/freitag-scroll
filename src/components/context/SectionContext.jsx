import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [sectionConfig, setSectionConfig] = useState([]);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // if (!sectionConfig) {
    //   window.scrollTo(0, 0);
    // }
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sectionConfig]);

  const SectionContextValue = {
    sectionConfig, setSectionConfig,
    activeSection, setActiveSection
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
import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [sectionConfig, setSectionConfig] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  
  // useEffect(() => {
  //   console.log(sectionConfig);
  // }, [sectionConfig]);

  // useEffect(() => {
  //   console.log(activeSection);
  // }, [activeSection]);
  

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
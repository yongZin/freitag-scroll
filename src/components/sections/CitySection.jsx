//동영상 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext } from "react";
import { SectionContext } from "../context/SectionContext";

const Content = styled.section``;

const CitySection = () => {
	const contentRef = useRef(null);
  const { setSectionConfig } = useContext(SectionContext);

  useEffect(() => {
    const info = {
      id: "city-section",
      objs: {
        containerRef: contentRef,
      },
      values: {
        
      }
    }

    setSectionConfig((prevTest) => {
			const addInfo = prevTest.some(item => item.id === info.id);

			return addInfo ? prevTest : [...prevTest, info];

		})
  }, [setSectionConfig]);
 
	return (
    <Content
      id="city-section"  
      ref={contentRef}
    >
      실용적이고 도시적인 감각
    </Content>
  );
}

export default CitySection;
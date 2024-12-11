//동영상 컴포넌트
import styled from "styled-components";
import { useRef, useContext } from "react";
import { ScrollContext } from "../context/ScrollContext";
// import { useObserver } from "../hooks/useScroll";

const Content = styled.section`
	height:200vh;
`;

const CitySection = () => {
	const contentRef = useRef(null);
	const { sections } = useContext(ScrollContext);

	// useObserver("city-section", contentRef);
	
	return (
		<Content
			id="city-section"
			ref={contentRef}
			className={
        sections["city-section"] && (
          sections["city-section"].active ? "on" : ""
        )
      }
		>
			실용적이고 도시적인 감각
		</Content>
	)
}

export default CitySection;
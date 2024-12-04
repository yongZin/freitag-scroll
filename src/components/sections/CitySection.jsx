//동영상 컴포넌트
import styled from "styled-components";
import { useRef } from "react";
// import { ScrollContext } from "../context/ScrollContext";
import { useObserver } from "../hooks/useScroll";

const Content = styled.section`

`;

const CitySection = () => {
	const contentRef = useRef(null);

	useObserver("city-section", contentRef);
	
	return (
		<Content
			id="city-section"
			ref={contentRef}
		>
			실용적이고 도시적인 감각
		</Content>
	)
}

export default CitySection;
//프라이탁 정보 컴포넌트
import styled from "styled-components";
import { useRef } from "react";
// import { ScrollContext } from "../context/ScrollContext";
import { useObserver } from "../hooks/useScroll";

const Content = styled.section`

`;

const DetailSection = () => {
	const contentRef = useRef(null);
	// const {contentRef} = useContext(ScrollContext);

	useObserver("detail-section", contentRef);

	return (
		<Content
			id="detail-section"
			ref={contentRef}
		>
			디테일 섹션
		</Content>
	)
}

export default DetailSection
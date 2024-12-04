//프라이탁 상품 컴포넌트
import styled from "styled-components";
import { useRef } from "react";
// import { ScrollContext } from "../context/ScrollContext";
import { useObserver } from "../hooks/useScroll";

const Content = styled.section`

`;

const ProductSection = () => {
	const contentRef = useRef(null);

	useObserver("product-section", contentRef);

	return (
		<Content
			id="product-section"
			ref={contentRef}
		>
			프라이탁의 다양한
			수납력
			디자인
			컬러감
		</Content>
	)
}

export default ProductSection
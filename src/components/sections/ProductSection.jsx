//프라이탁 상품 컴포넌트
import styled from "styled-components";
import { useRef, useContext } from "react";
import { ScrollContext } from "../context/ScrollContext";
// import { useObserver } from "../hooks/useScroll";

const Content = styled.section`
	height:200vh;
`;

const ProductSection = () => {
	const contentRef = useRef(null);
	const { sections } = useContext(ScrollContext);

	return (
		<Content
			id="product-section"
			ref={contentRef}
			className={
        sections["product-section"] && (
          sections["product-section"].active ? "on" : ""
        )
      }
		>
			프라이탁의 다양한
			수납력
			디자인
			컬러감
		</Content>
	)
}

export default ProductSection
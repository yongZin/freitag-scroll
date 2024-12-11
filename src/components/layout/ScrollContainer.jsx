//스크롤이벤트 영역 컨테이너
import { useRef } from "react";
import styled from "styled-components";
import TopSection from "../sections/TopSection";
import DetailSection from "../sections/DetailSection";
import CitySection from "../sections/CitySection";
import ProductSection from "../sections/ProductSection";
import {
	useSections,
	useObserver,
	useAnimation,
	useCanvas
} from "../hooks/useScroll";

const Container = styled.main`
	width:100%;
	background-color:#fff;
	position:relative;
	section{
		width:100%;
		min-height:100vh;
		overflow:hidden;
		position:relative;
		z-index:1;
	}
`;

const ScrollContainer = () => {
	const containerRef = useRef(null)

	useSections(containerRef);
	useObserver(containerRef);
	useAnimation();
	useCanvas();

	return (
		<Container ref={containerRef}>
			<TopSection id="top-section" /> {/* useAnimation, useCanvas */}
			<DetailSection id="detail-section" /> {/* useAnimation, useCanvas */}
			<CitySection id="city-section"  /> {/* useAnimation */}
			<ProductSection id="product-section" /> {/* useAnimation */}
		</Container>
	)
}

export default ScrollContainer;
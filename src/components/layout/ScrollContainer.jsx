//스크롤이벤트 영역 컨테이너
import { useRef } from "react";
import styled from "styled-components";
import TopSection from "../sections/TopSection";
import DetailSection from "../sections/DetailSection";
import CitySection from "../sections/CitySection";
import ProductSection from "../sections/ProductSection";
import LinkSection from "../sections/LinkSection";
import { useCanvasImages, useLayout, useActive, useAnimation, useScrollDirection } from "../hooks/useSection";

const Container = styled.main`
	width:100%;
	background-color:#fff;
	position:relative;
	section{
		width:100%;
		min-height:100vh;
		overflow:hidden;
		z-index:1;
	}
`;

const ScrollContainer = () => {
	const containerRef = useRef(null);

	useCanvasImages();
	useLayout(containerRef);
	useActive();
	useAnimation();
	useScrollDirection();

	return (
		<Container ref={containerRef}>
			<TopSection />
			<DetailSection />
			<CitySection />
			<ProductSection />
			<LinkSection />
		</Container>
	)
}

export default ScrollContainer;
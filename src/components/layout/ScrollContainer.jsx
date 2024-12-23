//스크롤이벤트 영역 컨테이너
import { useRef } from "react";
import styled from "styled-components";
import TopSection from "../sections/TopSection";
import DetailSection from "../sections/DetailSection";
import CitySection from "../sections/CitySection";
import ProductSection from "../sections/ProductSection";
import { useCanvasImages, useLayout, useActive, useAnimation } from "../hooks/useSection";
import { useEffect } from "react";
import { useContext } from "react";
import { SectionContext } from "../context/SectionContext";

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
	const containerRef = useRef(null);
	const { sectionConfig, setActiveSection } = useContext(SectionContext)

	useEffect(() => { //첫 렌더링후 스크롤 하기 전 섹션 활성화
		if(sectionConfig) {
			setTimeout(() => setActiveSection("top-section"), 100);
		}
	}, [sectionConfig, setActiveSection]);

	useCanvasImages();
	useLayout(containerRef);
	useActive();
	useAnimation();

	return (
		<Container ref={containerRef}>
			<TopSection id="top-section" />
			<DetailSection id="detail-section" />
			<CitySection id="city-section"  />
			<ProductSection id="product-section" />
		</Container>
	)
}

export default ScrollContainer;
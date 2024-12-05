//스크롤이벤트 영역 컨테이너
import styled from "styled-components";
import TopSection from "../sections/TopSection";
import DetailSection from "../sections/DetailSection";
import CitySection from "../sections/CitySection";
import ProductSection from "../sections/ProductSection";

const Container = styled.main`
	width:100%;
	position:relative;
	section{
		width:100%;
		min-height:100vh;
		position:sticky;
		top:0;
		background-color:#fff;
		overflow:hidden;
	}
`;

const ScrollContainer = () => {
	return (
		<Container>
			<TopSection id="top-section" />
			<DetailSection id="detail-section" />
			<CitySection id="city-section"  />
			<ProductSection id="product-section" />
		</Container>
	)
}

export default ScrollContainer;
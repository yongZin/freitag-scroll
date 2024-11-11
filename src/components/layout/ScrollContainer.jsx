//스크롤이벤트 영역 컨테이너
import TopSection from "../sections/TopSection";
import VideoSection from "../sections/VideoSection";
import ProducuSection from "../sections/ProductSection"
import StoreSection from "../sections/StoreSection";
import styled from "styled-components";

const Container = styled.main`
	section{
		width:100%;
		min-height:100vh;
	}
`;

const ScrollContainer = () => {
	return (
		<Container>
			<TopSection />
			<VideoSection />
			<ProducuSection />
			<StoreSection />
		</Container>
	)
}

export default ScrollContainer
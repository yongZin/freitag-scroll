//프라이탁 정보 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext, useMemo } from "react";
import { ScrollContext } from "../context/ScrollContext";

const CanvasBox = styled.div`
  width:100%;
  top:50%;
  left:0;
  transform:translateY(-50%);
  canvas{
    width:100%;
    max-width:823px;
    height:100vh;
    max-height:558px;
    display:block;
    margin:0 auto;
    object-fit:cover;
  }
`;
const MaterialMessage = styled.ul`

`;
const InsideMessage = styled.ul`

`;
const Content = styled.section`
  height:600vh;
  opacity:0;
  &.on{
    ${CanvasBox} {
      position:fixed;
    }
  }
`;

const DetailSection = () => {
	const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const {
		imageSrc,
    setImageSrc,
    setImageType,
    setTotalImages,
    setObjects,
		sections,
    animationStyles
  } = useContext(ScrollContext);
  const totalImages = 407;

  const object = useMemo(() => [
    // option: [시작 값, 끝 값, { 애니메이션 시작 타이밍, 애니메이션 끝 타이밍 }]
    {
      target: "Background",
      translate_in: [
        { x: 0, y: 0 }, //시작 값
        { x: 0, y: 0 }, //끝 값
        { start: 0, end: 1 } //애니메이션 시작, 끝 타이밍(진행률)
      ],
      opacity_in: [0, 1, { start: 0, end: 0.05 }],
      opacity_out: [1, 0, { start: 0.88, end: 0.95 }]
    },
  ], []);

	useEffect(() => {
    const isTopSectionActive = sections["detail-section"] && sections["detail-section"].active;
    
		if(
      isTopSectionActive &&
      imageSrc !== "/assets/images/detail/detail-"
    ) {
			setImageSrc("/assets/images/detail/detail-");
			setImageType("png");
			setTotalImages(totalImages);
			setObjects(object);
		}
  }, [sections, imageSrc, setImageSrc, setImageType, setTotalImages, setObjects, object])
 
	return (
		<Content
			id="detail-section"
			ref={contentRef}
      style={{opacity: animationStyles["detail-section"]?.Background?.opacity}}
			className={
        sections["detail-section"] && (
          sections["detail-section"].active ? "on" : ""
        )
      }
		>
			<CanvasBox>
				<canvas ref={canvasRef} />
			</CanvasBox>
			
			<MaterialMessage>
				<li><strong>타폴린</strong>가방 본 체의 소재로서 5년 이상 트럭에 씌워져 달린 방수포들 중에서 개성을 표현하기에 적합한 프린트를 보유하고, 파손율이 적은 것을 까다롭게 선별</li>
        <li><strong>자전거 바퀴의 고무 튜브</strong>가방의 테두리를 감싸는 ‘라이닝’ 용도로 유연한 고무의 성질을 활용해 가방 모서리를 튼튼하게 보호하며, 본체 덮개에 안정감 강화</li>
        <li><strong>자동차 안전벨트</strong>프라이탁 가방의 스트랩은 폴리에스터 고강력사 소재 특성상 뛰어난 내구성과 좋은 착용감 가진 자동차 안전벨트를 활용</li>
			</MaterialMessage>

      <InsideMessage>
        <li>궂은 날씨에도 안전하게</li>
        <li>지퍼로 한 번 더 안전하게</li>
        <li>활용도 높은 포켓공간</li>
        <li>
          <span>내부에는 안감이 없기 때문에 쉽게 분해되고, 필요한 경우 언제나 수리할 수 있으므로 제품을 오래도록 사용 해보세요. 또한, 우리는 타폴린, 안전벨트, 고무 튜브 외에도 100% 재활용이 가능한 PET 소재를 활용하여 경량성과 우수한 촉감을 겸비하는 새로운 프라이탁도 탄생시켰죠</span>
        </li>
      </InsideMessage>
		</Content>
	)
}

export default DetailSection;
//상단 컨텐츠
import styled from "styled-components";
import { useRef, useEffect, useContext, useMemo } from "react";
import { ScrollContext } from "../context/ScrollContext";

const Background = styled.div`
  background-color:rgba(1, 1, 1, 0.5);
  opacity:0;
  inset:0;
  z-index:1;
`;
const CanvasBox = styled.div`
  position:relative;
  inset:0;
  z-index:-1;
  canvas{
    width:100%;
    height:100vh;
    object-fit:cover;
    position:absolute;
    top:0;
    left:0;
  }
`;
const Messages = styled.div`
  p{
    width:100%;
    font-size:70px;
    text-align:center;
    color:#fff;
    position:fixed;
    top:50%;
    transform:translateY(-50%);
    z-index:3;
    font-family:var(--f-ebold);;
    opacity:0;
  }
`;
const Content = styled.section`
  height:400vh;
  opacity:0;
  &.on{
    opacity:1;
    ${CanvasBox}, ${Background} {
      position:fixed;
    }
    /* ${Messages} {
      p{
        position:fixed;
      }
    } */
  }
`;

const TopSection = () => {
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
  const totalImages = 494;
  
  const object = useMemo(() => [
    // option: [시작 값, 끝 값, { 애니메이션 시작 타이밍, 애니메이션 끝 타이밍 }]
    {
      target: "Background",
      translate_in: [
        { x: 0, y: 0 }, //시작 값
        { x: 0, y: 0 }, //끝 값
        { start: 0, end: 1 } //애니메이션 시작, 끝 타이밍(진행률)
      ],
      opacity_in: [0, 1, { start: 0.01, end: 0.1 }]
    },
    {
      target: "Finish",
      translate_in: [
        { x: 0, y: 0 }, //시작 값
        { x: 0, y: 0 }, //끝 값
        { start: 0, end: 1 } //애니메이션 시작, 끝 타이밍(진행률)
      ],
      opacity_in: [1, 1, { start: 0, end: 0 }],
      opacity_out: [1, 0, { start: 0.88, end: 0.95 }]
    },
    {
      target: "Message1",
      translate_in: [
        { x: 0, y: 30 }, //시작 값
        { x: 0, y: 0 }, //끝 값
        { start: 0.1, end: 0.2 } //애니메이션 시작, 끝 타이밍(진행률)
      ],
      translate_out: [
        { x: 0, y: 0 },
        { x: 0, y: -30 },
        { start: 0.25, end: 0.35 }
      ],
      opacity_in: [0, 1, { start: 0.1, end: 0.15 }],
      opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
    },
    {
      target: "Message2",
      translate_in: [
        { x: 0, y: 30 },
        { x: 0, y: 0 },
        { start: 0.35, end: 0.45 }
      ],
      translate_out: [
        { x: 0, y: 0 },
        { x: 0, y: -30 },
        { start: 0.55, end: 0.65 }
      ],
      opacity_in: [0, 1, { start: 0.35, end: 0.4 }],
      opacity_out: [1, 0, { start: 0.5, end: 0.65 }],
    },
    {
      target: "Message3",
      translate_in: [
        { x: 0, y: 30 },
        { x: 0, y: 0 },
        { start: 0.65, end: 0.75 }
      ],
      opacity_in: [0, 1, { start: 0.65, end: 0.7 }],
    },
  ], []);
  
  useEffect(() => {
    const isTopSectionActive = sections["top-section"] && sections["top-section"].active;
    
    if(
      isTopSectionActive &&
      imageSrc !== "/assets/images/top/top-"
    ) {
      setImageSrc("/assets/images/top/top-");
      setImageType("jpg");
      setTotalImages(totalImages);
      setObjects(object);
    }
  }, [sections, imageSrc, setImageSrc, setImageType, setTotalImages, setObjects, object])

  return (
    <Content
      id="top-section"  
      ref={contentRef}
      style={{opacity: animationStyles["top-section"]?.Finish?.opacity}}
      className={
        sections["top-section"] && (
          sections["top-section"].active ? "on" : ""
        )
      }
    >
      <Background style={{opacity: animationStyles["top-section"]?.Background?.opacity}} />

      <CanvasBox>
        <canvas ref={canvasRef} />
      </CanvasBox>

      <Messages>
        <p
          style={{
            opacity: animationStyles["top-section"]?.Message1?.opacity,
            transform: animationStyles["top-section"]?.Message1?.transform
          }}
        >재활용이 아닌 새활용</p>
        <p
          style={{
            opacity: animationStyles["top-section"]?.Message2?.opacity,
            transform: animationStyles["top-section"]?.Message2?.transform
          }}
        >버려진 트럭 방수포에</p>
        <p
          style={{
            opacity: animationStyles["top-section"]?.Message3?.opacity,
            transform: animationStyles["top-section"]?.Message3?.transform
          }}
        >새로운 가치를 더하다</p>
      </Messages>
    </Content>
  );
};

export default TopSection;
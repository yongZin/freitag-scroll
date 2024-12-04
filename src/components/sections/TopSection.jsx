//상단 컨텐츠
import styled from "styled-components";
import { useRef, useEffect, useContext, useMemo } from "react";
import { ScrollContext } from "../context/ScrollContext";
import { useObserver, useAnimation, useCanvas } from "../hooks/useScroll";

const Container = styled.section`
  height: 400vh;
  position:relative;
  /* pointer-events:none; */
`;
const Background = styled.div`
  background-color:rgba(1, 1, 1, 0.5);
  opacity:0;
  position:absolute;
  inset:0;
  z-index:1;
`;
const CanvasBox = styled.div`
  position:fixed;
  inset:0;
  canvas{
    width:100%;
    height:100vh;
    object-fit:cover;
  }
`;
const Message = styled.div`
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

const TopSection = () => {
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const {
    setImageSrc,
    setImageType,
    setTotalImages,
    setObjects,
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
    setImageSrc("/assets/images/top/top-");
    setImageType("jpg");
    setTotalImages(totalImages);
    setObjects(object);
  }, [setImageSrc, setImageType, setTotalImages, setObjects, object])

  useObserver("top-section", contentRef, canvasRef);
  useCanvas();
  useAnimation();

  return (
    <Container
      id="top-section"  
      ref={contentRef}
    >
      <Background style={{opacity: animationStyles.Background?.opacity}} />

      <CanvasBox>
        <canvas ref={canvasRef} />
      </CanvasBox>

      <Message>
        <p
          style={{
            opacity: animationStyles.Message1?.opacity,
            transform: animationStyles.Message1?.transform
          }}
        >재활용이 아닌 새활용</p>
        <p
          style={{
            opacity: animationStyles.Message2?.opacity,
            transform: animationStyles.Message2?.transform
          }}
        >버려진 트럭 방수포에</p>
        <p
          style={{
            opacity: animationStyles.Message3?.opacity,
            transform: animationStyles.Message3?.transform
          }}
        >새로운 가치를 더하다</p>
      </Message>
    </Container>
  );
};

export default TopSection;
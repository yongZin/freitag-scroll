//상단 컨텐츠
import styled from "styled-components";
import { useEffect, useContext, useMemo } from "react";
import { ScrollContext } from "../context/ScrollContext";
import { useAnimation, useCanvas } from "../hooks/useScroll";

const Container = styled.section`
  height: 400vh;
  position:relative;
  /* pointer-events:none; */
  &:before{
    content:"";
    background-color:rgba(1, 1, 1, 0.5);
    position:absolute;
    inset:0;
    z-index:1;
  }
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
  const {
    containerRef,
    canvasRef,
    setImageSrc,
    setImageType,
    setTotalImages,
    setOptions,
    animationStyles
  } = useContext(ScrollContext);
  const totalImages = 494;
  
  const messages = useMemo(() => [
    // option: [시작 값, 끝 값, { 애니메이션 시작 타이밍, 애니메이션 끝 타이밍 }]
    {
      text: "재활용이 아닌 새활용",
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
      text: "버려진 트럭 방수포에",
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
      text: "새로운 가치를 더하다",
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
    setOptions(messages);
  }, [setImageSrc, setImageType, setTotalImages, setOptions, messages])

  useCanvas();
  useAnimation();

  return (
    <Container ref={containerRef}>
      <CanvasBox>
        <canvas ref={canvasRef} />
      </CanvasBox>

      <Message>
        {messages.map((message, index) => (
          <p
            key={index}
            style={{
              opacity: animationStyles[index]?.opacity,
              transform: animationStyles[index]?.transform
            }}
          >
            {message.text}
          </p>
        ))}
      </Message>
    </Container>
  );
};

export default TopSection;
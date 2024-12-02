//상단 컨텐츠
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

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
  }
`;

const TopSection = () => {
  const [images, setImages] = useState([]);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const totalImages = 494;

  // eslint-disable-next-line
  const messages = [
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
  ]

  const [messageStyles, setMessageStyles] = useState(
    messages.map(() => ({ opacity: 0, transform: "translate(30px, 0)" }))
  );

  useEffect(() => { //메세지 이벤트
    const handleScroll = () => {
      const scrollY = window.scrollY; //현재 스크롤 위치
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight; //스크롤 가능한 전체 거리(섹션 높이 - 뷰포트 높이)
      const scrollProgress = Math.min(scrollY / maxScroll, 1); //진행률

      const newStyles = messages.map((message) => {
        const calcProgress = ({start, end}, progress) => {
          //현재 애니메이션 진행률
          if (progress < start) return 0;
          if (progress > end) return 1;

          return (progress - start) / (end - start);
        };

        const calcValue = (startValue, endValue, progress) => {
          //현재 애니메이션 진행률의 값 계산
          return startValue + (endValue - startValue) * progress;
        }

        const getAnimatedValue = (inProgress, outProgress, inRange, outRange) => {
          //현재 애니메이션 상태의 값 리턴
          if (inProgress < 1) {
            return calcValue(inRange[0], inRange[1], inProgress);
          }
          if (outRange) {
            return calcValue(outRange[0], outRange[1], outProgress);
          }
          return inRange[1];
        };

        const translateInProgress = calcProgress(message.translate_in[2], scrollProgress);
        const opacityInProgress = calcProgress(message.opacity_in[2], scrollProgress);

        const translateOutProgress = calcProgress(message.translate_out?.[2] || [1, 1], scrollProgress);
        const opacityOutProgress = calcProgress(message.opacity_out?.[2] || [1, 1], scrollProgress);

        const x = getAnimatedValue(
          translateInProgress,
          translateOutProgress,
          [message.translate_in[0].x, message.translate_in[1].x],
          message.translate_out && [message.translate_out[0].x, message.translate_out[1].x]
        );
        
        const y = getAnimatedValue(
          translateInProgress,
          translateOutProgress,
          [message.translate_in[0].y, message.translate_in[1].y],
          message.translate_out && [message.translate_out[0].y, message.translate_out[1].y]
        );
        
        const opacity = getAnimatedValue(
          opacityInProgress,
          opacityOutProgress,
          [message.opacity_in[0], message.opacity_in[1]],
          message.opacity_out && [message.opacity_out[0], message.opacity_out[1]]
        );

        return { opacity, transform: `translate(${x}px, ${y}px)` };
      });

      setMessageStyles(newStyles); //스크롤 진행률에 맞는 값 저장
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [messages]);

  useEffect(() => {
    const loadedImages = [];

    for(let i = 1; i <= totalImages; i++) {
      const img = new Image();

      img.src = `/src/assets/images/top/top-${i}.jpg`;
      
      loadedImages.push(img);
    }

    if(totalImages === loadedImages.length) {
      setImages(loadedImages);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      if (containerRef.current && images.length > 0) {
        const scrollY = window.scrollY;
        const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollY / maxScroll, 1);
  
        const imageIndex = Math.floor(scrollProgress * (totalImages - 1));
  
        if (images[imageIndex] && images[imageIndex].complete) {
          ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);
        }
      }
    };
  
    const handleScroll = () => {
      if (!containerRef.current || images.length === 0) return;
  
      const scrollY = window.scrollY;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
  
      const imageIndex = Math.floor(scrollProgress * (totalImages - 1));
  
      if (images[imageIndex] && images[imageIndex].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);
      }
    };
  
    // 이미지가 로드된 후 실행
    if (images.length > 0 && !images[0].complete) {
      images[0].onload = () => resizeCanvas();
    }
  
    // 이벤트 리스너 추가
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [images]);

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
              opacity: messageStyles[index]?.opacity,
              transform: messageStyles[index]?.transform
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
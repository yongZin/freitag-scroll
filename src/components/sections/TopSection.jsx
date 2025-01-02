//상단 컨텐츠
import styled from "styled-components";
import { useRef, useEffect, useContext } from "react";
import { SectionContext } from "../context/SectionContext";
import { useMemo } from "react";

const CanvasBox = styled.div`
  width:100%;
  height:100vh;
  position:absolute;
  top:0;
  left:0;
  canvas{
    width:100%;
    height:100vh;
    object-fit:cover;
  }
`;
const Background = styled.div`
  background-color:rgba(1, 1, 1, 0.5);
  opacity:0;
  position:absolute;
  inset:0;
  z-index:1;
`;
const Messages = styled.ul`
  width:100%;
  text-align:center;
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  z-index:2;
  li{
    width:100%;
    padding:0 20px;
    font-size:70px;
    font-family:var(--f-ebold);;
    color:#fff;
    position:absolute;
    top:0;
    z-index:3;
    opacity:0;
  }
`;
const Content = styled.section`
  height:400vh;
  &.on{
    >div{
      position:fixed;
      inset:0;
    }
  }
`;

const TopSection = () => {
	const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const backgroundRef = useRef(null);
  const messageARef = useRef(null);
  const messageBRef = useRef(null);
  const messageCRef = useRef(null);
  const {
    setSectionConfig,
    activeSection,
    isLoaded
  } = useContext(SectionContext);

  const animationConfig = useMemo(() => {
    return {
      id: "top-section",
      content: {
        target: contentRef,
        values: {
          opacity: {
            in: [1, 1, { start: 0, end: 0 }],
            out: [1, 0, { start: 0.88, end: 1 }],
          }
        }
      },
      background: {
        target: backgroundRef,
        values: {
          opacity: {
            in: [0, 1, { start: 0.01, end: 0.1 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      canvas: {
        target: canvasRef,
        values: {
          imageSrc: "/assets/images/top/top-",
          imageType: "jpg",
          imageCount: 494,
          images: [],
          videoImage: [1, 494, { start: 0, end: 0.99 }]
        }
      },
      messageA: {
        target: messageARef,
        values: {
          translate: {
            in: [30, 0, { start: 0.1, end: 0.2 }],
            out: [0, -30, { start: 0.25, end: 0.35 }],
          },
          opacity: {
            in: [0, 1, { start: 0.1, end: 0.15 }],
            out: [1, 0, { start: 0.3, end: 0.35 }],
          }
        }
      },
      messageB: {
        target: messageBRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.35, end: 0.45 }],
            out: [0, -30, { start: 0.55, end: 0.65 }],
          },
          opacity: {
            in: [0, 1, { start: 0.35, end: 0.4 }],
            out: [1, 0, { start: 0.5, end: 0.65 }],
          }
        }
      },
      messageC: {
        target: messageCRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.65, end: 0.75 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.65, end: 0.7 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
    }
  }, []);

  useEffect(() => { //sectionConfig에 정보 저장하기(이전 정보와 함께 저장)
    setSectionConfig((prevConfig) => {
			const addInfo = prevConfig.some(item => item.id === animationConfig.id);

			return addInfo ? prevConfig : [...prevConfig, animationConfig];

		})
  }, [animationConfig, setSectionConfig]);
 
	return (
    <Content
      id="top-section"  
      ref={contentRef}
      className={activeSection === "top-section" && "on"}
    >
      {isLoaded &&
        <div>
          <Background ref={backgroundRef} />

          <CanvasBox>
            <canvas ref={canvasRef} />
          </CanvasBox>

          <Messages>
            <li ref={messageARef}>재활용이 아닌 새활용</li>
            <li ref={messageBRef}>버려진 트럭 방수포에</li>
            <li ref={messageCRef}>새로운 가치를 더하다</li>
          </Messages>
        </div>
      }
    </Content>
  );
}

export default TopSection;
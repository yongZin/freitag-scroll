//동영상 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext, useMemo } from "react";
import { SectionContext } from "../context/SectionContext";

const Background = styled.div`
  background-color:rgba(1, 1, 1, 0.5);
  opacity:0;
  position:absolute;
  inset:0;
  z-index:2;
`;
const VideoBox = styled.div`
  overflow:hidden;
  position:absolute;
  inset:0;
  z-index:1;
  video{
    height:100%;
    position:absolute;
    top:0;
    left:50%;
    transform:translateX(-50%);
  }
`;
const MessageBox = styled.div`
  width:100%;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  z-index:3;
  p{
    font-size:60px;
    font-family:var(--f-ebold);
    text-align:center;
    transition:0.3s;
    opacity:0;
    color:#fff;
    word-break:keep-all;
  }
  @media ${props => props.theme.tablet} {
    p{
      font-size:55px;
    }
	}
  @media ${props => props.theme.mobile} {
    p{
      font-size:50px;
    }
	}
  @media ${props => props.theme.mobile_xs} {
    p{
      font-size:40px;
    }
	}
`;
const Content = styled.section`
  height:200vh;
  >div{
    position:relative;
    width:100%;
    min-height:100vh;
  }
  &.on{
    >div{
      position:fixed;
      inset:0;
    }
  }
`;

const CitySection = () => {
  const contentRef = useRef(null);
	const backgroundRef = useRef(null);
	const messageRef = useRef(null);
	const videoRef = useRef(null);
  const {
    setSectionConfig,
    activeSection
  } = useContext(SectionContext);

  const animationConfig = useMemo(() => {
    return {
      id: "city-section",
      content: {
        target: contentRef,
        values: {
          opacity: {
            in: [1, 1, { start: 0, end: 0 }],
            out: [1, 0, { start: 0.8, end: 1 }],
          }
        }
      },
      background: {
        target: backgroundRef,
        values: {
          opacity: {
            in: [0, 1, { start: 0, end: 0.15 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      Message: {
        target: messageRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.3, end: 0.4 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.3, end: 0.35 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      }
    }
  }, []);

  useEffect(() => { //sectionConfig에 정보 저장하기(이전 정보와 함께 저장)
    setSectionConfig((prevConfig) => {
			const addInfo = prevConfig.some(item => item.id === animationConfig.id);

			return addInfo ? prevConfig : [...prevConfig, animationConfig];

		})
  }, [animationConfig, setSectionConfig]);

  useEffect(() => { //콘텐츠 활성화시 동영상 재생
    const videoElement = videoRef.current;

    if(videoElement) {
      if(activeSection === "city-section") {
        videoElement.play();
      } else{
        videoElement.pause();
      }
    }
  }, [activeSection])
 
	return (
    <Content
      id="city-section"
      ref={contentRef}
      className={activeSection === "city-section" && "on"}
    >
      <div>
        <Background ref={backgroundRef}></Background>

        <VideoBox>
          <video
            ref={videoRef}
            muted playsInline loop
          >
            <source src="/assets/videos/city.mp4" />
          </video>
        </VideoBox>

        <MessageBox>
          <p ref={messageRef}>실용적이고 도시적인 감각</p>
        </MessageBox>
      </div>
    </Content>
  );
}

export default CitySection;
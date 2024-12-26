//프라이탁 정보 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext, useMemo } from "react";
import { SectionContext } from "../context/SectionContext";

const CanvasBox = styled.div`
  width:100%;
  height:92vh;
  position:absolute;
  top:8vh;
  left:0;
  canvas{
    width:100%;
    height:100vh;
    object-fit:none;
    transform:translateX(-2%);
  }
`;
const MaterialMessage = styled.ul`
  width:100%;
  max-width:680px;
  position:absolute;
  top:25%;
  left:50%;
  transform:translateX(-50%);
  li{
    width:100%;
    padding:0 20px;
    line-height:1.5;
    font-size:20px;
    text-align:center;
    font-family:var(--f-reular);
    color:#86868b;
    word-break:keep-all;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    strong{
      display:block;
      margin-bottom:3px;
      font-size:1.2em;
      font-family: var(--f-ebold);
      color:#1d1d1f;
    }
  }
  @media ${props => props.theme.pc} {
    max-width:1185px;
    top:45%;
    li{
      max-width:240px;
      padding:0;
      font-size:16px;
      strong{
        display:inline-block;
        margin-right:4px;
        font-size:1em;
        font-family:var(--f-bold);
      }
      &:nth-child(2){
        left:auto;
        right:0;
      }
    }
	}
  @media ${props => props.theme.tablet} {
    max-width:580px;
    top:27%;
    li{
      font-size:18px;
    }
	}
  @media ${props => props.theme.mobile} {
    max-width:480px;
    top:30%;
    li{
      font-size:16px;
    }
	}
  @media ${props => props.theme.mobile_xs} {
    top:35%;
    li{
      font-size:15px;
    }
	}
`;
const InsideMessage = styled.ul`
  width:100%;
  position:absolute;
  top:0;
  li{
    width:100%;
    padding:0 20px;
    font-size:70px;
    font-family:var(--f-ebold);
    text-align:center;
    word-break:keep-all;
    opacity:0;
    position:absolute;
    top:20vh;
    left:0;
    span{
      max-width:500px;
      display:block;
      margin:0 auto;
      padding-top:13vh;
      font-size:17px;
      line-height:1.5;
      font-family:var(--f-reular);
      color:#86868b;
    }
  }
`;
const Content = styled.section`
  height:1000vh;
  padding-top:20vh;
  opacity:0;
  &.on{
    >div{
      position:fixed;
      inset:0;
    }
  }
`;

const DetailSection = () => {
  const { setSectionConfig, activeSection } = useContext(SectionContext);
	const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const materiaARef = useRef(null);
  const materiaBRef = useRef(null);
  const materiaCRef = useRef(null);
  const insideARef = useRef(null);
  const insideBRef = useRef(null);
  const insideCRef = useRef(null);
  const insideDRef = useRef(null);
  
  const animationConfig = useMemo(() => {
    return {
      id: "detail-section",
      content: {
        target: contentRef,
        values: {
          opacity: {
            in: [0, 1, { start: 0, end: 0.01 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      canvas: {
        target: canvasRef,
        values: {
          imageSrc: "/assets/images/detail/detail-",
          imageType: "png",
          imageCount: 407,
          images: [],
          videoImage: [1, 407, { start: 0, end: 1 }]
        }
      },
      MateriaA: {
        target: materiaARef,
        values: {
          translate: {
            in: [30, 0, { start: 0.02, end: 0.06 }],
            out: [0, -30, { start: 0.07, end: 0.11 }],
          },
          opacity: {
            in: [0, 1, { start: 0.02, end: 0.04 }],
            out: [1, 0, { start: 0.09, end: 0.11 }],
          }
        }
      },
      MateriaB: {
        target: materiaBRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.11, end: 0.15 }],
            out: [0, -30, { start: 0.17, end: 0.21 }],
          },
          opacity: {
            in: [0, 1, { start: 0.11, end: 0.13 }],
            out: [1, 0, { start: 0.19, end: 0.21 }],
          }
        }
      },
      MateriaC: {
        target: materiaCRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.21, end: 0.25 }],
            out: [0, -30, { start: 0.27, end: 0.31 }],
          },
          opacity: {
            in: [0, 1, { start: 0.21, end: 0.23 }],
            out: [1, 0, { start: 0.29, end: 0.31 }],
          }
        }
      },
      InsideA: {
        target: insideARef,
        values: {
          translate: {
            in: [20, 0, { start: 0.33, end: 0.37 }],
            out: [0, -20, { start: 0.39, end: 0.43 }],
          },
          opacity: {
            in: [0, 1, { start: 0.33, end: 0.35 }],
            out: [1, 0, { start: 0.41, end: 0.43 }],
          }
        }
      },
      InsideB: {
        target: insideBRef,
        values: {
          translate: {
            in: [20, 0, { start: 0.43, end: 0.47 }],
            out: [0, -20, { start: 0.49, end: 0.53 }],
          },
          opacity: {
            in: [0, 1, { start: 0.43, end: 0.45 }],
            out: [1, 0, { start: 0.51, end: 0.53 }],
          }
        }
      },
      InsideC: {
        target: insideCRef,
        values: {
          translate: {
            in: [20, 0, { start: 0.53, end: 0.57 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.53, end: 0.55 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      InsideD: {
        target: insideDRef,
        values: {
          translate: {
            in: [0, 0, { start: 0, end: 0 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.75, end: 0.8 }],
            out: [1, 0, { start: 1, end: 1 }],
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
			id="detail-section"
			ref={contentRef}
      className={activeSection === "detail-section" && "on"}
		>
      <div>
        <CanvasBox>
          <canvas ref={canvasRef} />
        </CanvasBox>
        
        <MaterialMessage>
          <li ref={materiaARef}>
            <strong>타폴린</strong>가방 본체의 소재로서 5년 이상 트럭에 씌워져 달린 방수포들 중에서 개성을 표현하기에 적합한 프린트를 보유하고, 파손율이 적은 것을 까다롭게 선별
          </li>
          <li ref={materiaBRef}>
            <strong>자전거 바퀴의 고무 튜브</strong>가방의 테두리를 감싸는 ‘라이닝’ 용도로 유연한 고무의 성질을 활용해 가방 모서리를 튼튼하게 보호하며, 본체 덮개에 안정감 강화
          </li>
          <li ref={materiaCRef}>
            <strong>자동차 안전벨트</strong>프라이탁 가방의 스트랩은 폴리에스터 고강력사 소재 특성상 뛰어난 내구성과 좋은 착용감 가진 자동차 안전벨트를 활용
          </li>
        </MaterialMessage>

        <InsideMessage>
          <li ref={insideARef}>궂은 날씨에도 안전하게</li>
          <li ref={insideBRef}>지퍼로 한 번 더 안전하게</li>
          <li ref={insideCRef}>활용도 높은 포켓공간</li>
          <li ref={insideDRef}>
            <span>내부에는 안감이 없기 때문에 쉽게 분해되고, 필요한 경우 언제나 수리할 수 있으므로 제품을 오래도록 사용 해보세요. 또한, 우리는 타폴린, 안전벨트, 고무 튜브 외에도 100% 재활용이 가능한 PET 소재를 활용하여 경량성과 우수한 촉감을 겸비하는 새로운 프라이탁도 탄생시켰죠</span>
          </li>
        </InsideMessage>
      </div>
		</Content>
	)
}

export default DetailSection;
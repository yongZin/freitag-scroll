//최하단 컴포넌트(product-upload 포트폴리오로 연결)
import { useRef, useContext, useMemo, useEffect } from "react";
import styled from "styled-components";
import { SectionContext } from "../context/SectionContext";
import { Link } from "react-router-dom";

const Content = styled.section`
	height:300vh;
	opacity:0;
	z-index:10;
	>div{
		display:flex;
		justify-content:center;
		align-items:center;
		flex-direction:column;
		position:relative;
	}
	&.on{
		>div{
			position:fixed;
			inset:0;
		}
	}
`;
const Text = styled.p`
	font-size:55px;
	font-family:var(--f-ebold);
	text-align:center;
	word-break:keep-all;
	span{
		display:block;
	}
	@media ${props => props.theme.tablet} {
    font-size:45px;
	}
	@media ${props => props.theme.mobile} {
    font-size:38px;
	}
	@media ${props => props.theme.mobile_xs} {
    font-size:30px;
	}
`;
const StyledLink = styled(Link)`
	margin-top:50px;
	padding:30px 60px;
	font-size:27px;
	border-radius:46px;
	color:#fff;
	opacity:0;
	background-color:transparent;
	background-image:linear-gradient(to left top, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
	animation:rotate 3s linear infinite;
	@media ${props => props.theme.tablet} {
    padding:25px 60px;
		font-size:25px;
	}
	@media ${props => props.theme.mobile} {
    margin-top:30px;
		padding:20px 50px;
		font-size:18px;
	}
	@media ${props => props.theme.mobile_xs} {
    margin-top:20px;
		padding:15px 40px;
		font-size:15px;
	}
	@keyframes rotate {
		0%{
			filter:hue-rotate(0deg);
		}
		100%{
			filter:hue-rotate(360deg)
		}
	}
`;

const LinkSection = () => {
	const contentRef = useRef(null);
	const buttonRef = useRef(null);
	const {
    setSectionConfig,
    activeSection
  } = useContext(SectionContext);
	
	const animationConfig = useMemo(() => {
    return {
      id: "link-section",
      content: {
        target: contentRef,
        values: {
          opacity: {
            in: [0, 1, { start: 0, end: 0.4 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
			button: {
        target: buttonRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.45, end: 0.55 }],
            out: [0, 0, { start: 1, end:1 }],
          },
					opacity: {
            in: [0, 1, { start: 0.45, end: 0.5 }],
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
			id="link-section"
			ref={contentRef}
			className={activeSection === "link-section" && "on"}
		>
			<div>
				<Text>온라인 스토어에서 <span>나만의 프라이탁을 만나보세요</span></Text>

				<StyledLink
					ref={buttonRef}
					target="/blank"
					to="https://yongzin-upload.vercel.app/"
				>
					보러가기
				</StyledLink>
			</div>
		</Content>
	)
}

export default LinkSection
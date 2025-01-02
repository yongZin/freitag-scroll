//프라이탁 상품 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext } from "react";
import { SectionContext } from "../context/SectionContext";
import img from "/assets/images/products/product-1.png";

const RowBox = styled.div`
  width:100%;
  font-size:0;
`;
const ProductBox = styled.ul`
  height:33.333vh;
  opacity:0;
  white-space:nowrap;
  li{
    height:100%;
    display:inline-block;
    vertical-align:bottom;
    img{
      width:auto;
      height:100%;
    }
  }
`;
const MessageBox = styled.ul`
  height:33.333vh;
  display:flex;
  justify-content:center;
  align-items:center;
  font-family:var(--f-ebold);
  >p{
    font-size:60px;
    margin-right:20px;
    opacity:0;
  }
  >ul{
    width:185px;
    height:80px;
    position:relative;
    li{
      font-size:65px;
      color:rgba(0,0,0,0);
      opacity:0;
      position:absolute;
      top:0;
      left:0;
      text-transform:capitalize;
      background-clip:text;
      -webkit-background-clip:text;
      -webkit-text-fill-color:rgba(0, 0, 0, 0);
      animation:rotate 3s linear infinite;
      &:nth-child(1){
        background-image:linear-gradient(to right top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%);
      }
      &:nth-child(2){
        background-image:linear-gradient(to left bottom, #2ca2b4, #5598de 20%, #7f87ff 40%, #f65aad 60%, #ec3d43);
      }
      &:nth-child(3){
        background-image:linear-gradient(to left top, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
      }
      @keyframes rotate {
        0%{
          filter:hue-rotate(0deg);
        }
        100%{
          filter:hue-rotate(360deg)
        }
      }
    }
  }
`;
const Content = styled.section`
  height:500vh;
  &.on{
    ${RowBox}{
      position:fixed;
      inset:0;
    }
  }
`;

const ProductSection = () => {
	const messagePRef = useRef(null);
	const messageTrioARef = useRef(null);
	const messageTrioBRef = useRef(null);
	const messageTrioCRef = useRef(null);
	const productTopRef = useRef(null);
	const productBottomRef = useRef(null);
  const { setSectionConfig, activeSection } = useContext(SectionContext);
  const productImages = Array.from({ length: 20 }, (_, i) => {
    const number = i + 1;

    return {
      number,
      path: `/assets/images/products/product-${number}.png`
    }
  });

  useEffect(() => {
    const calcProductMove = () => { //ProductBox 이동거리 계산
      const product = productTopRef.current;

      if(! product) return 0;

      const productParent = product.parentElement.getBoundingClientRect();
      const productHeight = product.offsetHeight * 10;

      return productParent.width - productHeight;
    }

    const animationConfig = {
      id: "product-section",
      messageP: {
        target: messagePRef,
        values: {
          opacity: {
            in: [0, 1, { start: 0, end: 0.1 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      messageTrioA: {
        target: messageTrioARef,
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
      messageTrioB: {
        target: messageTrioBRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.35, end: 0.45 }],
            out: [0, -30, { start: 0.5, end: 0.6 }],
          },
          opacity: {
            in: [0, 1, { start: 0.35, end: 0.4 }],
            out: [1, 0, { start: 0.55, end: 0.6 }],
          }
        }
      },
      messageTrioC: {
        target: messageTrioCRef,
        values: {
          translate: {
            in: [30, 0, { start: 0.6, end: 0.7 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.6, end: 0.65 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      productTop: {
        target: productTopRef,
        values: {
          translateX: "X", //X축 이동이 필요한 경우
          translate: {
            in: [calcProductMove(), 0, { start: 0.35, end: 0.9 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.1, end: 0.2 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
      productBottom: {
        target: productBottomRef,
        values: {
          translateX: "X", //X축 이동이 필요한 경우
          translate: {
            in: [0, calcProductMove(), { start: 0.35, end: 0.9 }],
            out: [0, 0, { start: 1, end: 1 }],
          },
          opacity: {
            in: [0, 1, { start: 0.1, end: 0.2 }],
            out: [1, 1, { start: 1, end: 1 }],
          }
        }
      },
    };

    setSectionConfig((prevConfig) => { //sectionConfig에 정보 저장하기(이전 정보와 함께 저장)
      const addInfo = prevConfig.some(item => item.id === animationConfig.id);
      return addInfo ? prevConfig : [...prevConfig, animationConfig];
    });
  }, [setSectionConfig]);
  
	return (
    <Content
      id="product-section"  
      className={activeSection === "product-section" && "on"}
    >
      <RowBox>
        <img src={img} alt="aaa" />
        <ProductBox ref={productTopRef}>
          {productImages.slice(0, 10).map(({ number, path }) => (
            <li key={number}>
              <img src={path} alt="프라이탁 가방" />
            </li>
          ))}
        </ProductBox>

        <MessageBox>
          <p ref={messagePRef}>프라이탁의 다양한</p>
          <ul>
            <li ref={messageTrioARef}>컬러감</li>
            <li ref={messageTrioBRef}>수납력</li>
            <li ref={messageTrioCRef}>디자인</li>
          </ul>
        </MessageBox>
          
        <ProductBox ref={productBottomRef}>
          {productImages.slice(10).map(({ number, path }) => (
            <li key={number}>
              <img src={path} alt="프라이탁 가방" />
            </li>
          ))}
        </ProductBox>
      </RowBox>
    </Content>
  );
}

export default ProductSection;
//프라이탁 상품 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext } from "react";
import { SectionContext } from "../context/SectionContext";

const Content = styled.section``;

const ProductSection = () => {
	const contentRef = useRef(null);
  const { setSectionConfig } = useContext(SectionContext);

  useEffect(() => {
    const info = {
      id: "product-section",
      objs: {
        containerRef: contentRef,
      },
      values: {

      }
    }

    setSectionConfig((prevTest) => {
			const addInfo = prevTest.some(item => item.id === info.id);

			return addInfo ? prevTest : [...prevTest, info];

		})
  }, [setSectionConfig]);
 
	return (
    <Content
      id="product-section"  
      ref={contentRef}
    >
      프라이탁의 다양한
      수납력
      디자인
      컬러감
    </Content>
  );
}

export default ProductSection;


// import styled from "styled-components";
// import { useRef, useContext, useEffect } from "react";
// import { ScrollContext } from "../context/ScrollContext";
// // import { useObserver } from "../hooks/useScroll";

// const Content = styled.section`
// 	height:200vh;
// `;

// const ProductSection = () => {
// 	const contentRef = useRef(null);
// 	const { sections, setTest } = useContext(ScrollContext);

// 	useEffect(() => {
//     const aaa = {
//       id: "product-section",
//       objs: {
//         containerRef: contentRef,
//       },
//       values: {
//         contentOpacityOut: [1, 0, { start: 0.88, end: 1 }]
//       }
//     }

//     setTest((prevTest) => {
// 			const bbb = prevTest.some(item => item.id === aaa.id);

// 			return bbb ? prevTest : [...prevTest, aaa];

// 		})
//   }, [setTest]);

// 	return (
// 		<Content
// 			id="product-section"
// 			ref={contentRef}
// 			className={
//         sections["product-section"] && (
//           sections["product-section"].active ? "on" : ""
//         )
//       }
// 		>
// 			프라이탁의 다양한
// 			수납력
// 			디자인
// 			컬러감
// 		</Content>
// 	)
// }

// export default ProductSection
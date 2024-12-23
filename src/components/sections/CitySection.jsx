//동영상 컴포넌트
import styled from "styled-components";
import { useRef, useEffect, useContext } from "react";
import { SectionContext } from "../context/SectionContext";

const Content = styled.section``;

const CitySection = () => {
	const contentRef = useRef(null);
  const { setSectionConfig } = useContext(SectionContext);

  useEffect(() => {
    const info = {
      id: "city-section",
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
      id="city-section"  
      ref={contentRef}
    >
      실용적이고 도시적인 감각
    </Content>
  );
}

export default CitySection;


// import styled from "styled-components";
// import { useRef, useContext, useEffect } from "react";
// import { ScrollContext } from "../context/ScrollContext";
// // import { useObserver } from "../hooks/useScroll";

// const Content = styled.section`
// 	height:200vh;
// `;

// const CitySection = () => {
// 	const contentRef = useRef(null);
// 	const { sections, setTest } = useContext(ScrollContext);

// 	useEffect(() => {
//     const aaa = {
//       id: "city-section",
//       objs: {
//         containerRef: contentRef,
//       },
//       values: {
//         contentOpacityOut: [1, 0, { start: 0.88, end: 1 }]
//       }
//     }

//     // setTest(prevTest => [...prevTest, aaa]);

// 		setTest((prevTest) => {
// 			const bbb = prevTest.some(item => item.id === aaa.id);

// 			return bbb ? prevTest : [...prevTest, aaa];

// 		})
//   }, [setTest]);
	
// 	return (
// 		<Content
// 			id="city-section"
// 			ref={contentRef}
// 			className={
//         sections["city-section"] && (
//           sections["city-section"].active ? "on" : ""
//         )
//       }
// 		>
// 			실용적이고 도시적인 감각
// 		</Content>
// 	)
// }

// export default CitySection;
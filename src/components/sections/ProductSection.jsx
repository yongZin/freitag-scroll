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
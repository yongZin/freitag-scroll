import { createContext, useState, useEffect, useRef } from "react";
// import { useLoadImages } from "../hooks/useScroll";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(""); //이미지 소스
  const [imageType, setImageType] = useState(""); //이미지 타입
  const [images, setImages] = useState([]); //canvas에 그려질 이미지
  const [totalImages, setTotalImages] = useState(0); //images 수
  const [options, setOptions] = useState([]); //스크롤 애니메이션 옵션
  const [animationStyles, setAnimationStyles] = useState( //애니메이션 스타일
    options.map(() => ({ opacity: 0, transform: "translate(30px, 0)" }))
  );

  useEffect(() => {
    if (!imageSrc || !imageType || totalImages === 0) return;
    
    const loadedImages = [];

    for(let i = 1; i <= totalImages; i++) {
      const img = new Image();

      img.src = `${imageSrc}${i}.${imageType}`;
      
      loadedImages.push(img);
    }

    if(totalImages === loadedImages.length) {
      setImages(loadedImages);
    }

  }, [imageSrc, imageType, totalImages]);

  const ScrollContextValue = {
    containerRef,
    canvasRef,
    imageSrc, setImageSrc,
    imageType, setImageType,
    images, setImages,
    totalImages, setTotalImages,
    options, setOptions,
    animationStyles, setAnimationStyles
	};

  return(
    <ScrollContext.Provider value={ScrollContextValue}>
      {children}
    </ScrollContext.Provider>
  )
}
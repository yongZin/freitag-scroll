//스크롤 관련 커스텀 훅
import { useContext, useEffect } from "react"
import { ScrollContext } from "../context/ScrollContext"

export const useAnimation = () => { //스크롤 애니메이션(메시지, 배경)
  const {
    containerRef,
    options,
    setAnimationStyles
  } = useContext(ScrollContext);

  useEffect(() => {
    if(!containerRef.current || options.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY; //현재 스크롤 위치
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight; //최대 스크롤 가능 범위
      const scrollProgress = Math.min(scrollY / maxScroll, 1); //진행률

      const newStyles = options.map((object) => {
        const calcProgress = ({start, end}, progress) => {
          //현재 애니메이션 진행률
          if(progress < start) return 0;
          if(progress > end) return 1;

          return (progress - start) / (end - start);
        }

        const calcValue = (startValue, endValue, progress) => {
          //현재 애니메이션 진행률의 값 계산
          return startValue + (endValue - startValue) * progress;
        }

        const getAnimatedValue = (inProgress, outProgress, inRange, outRange) => {
          //현재 애니메이션 상태의 값 리턴
          if(inProgress < 1) return calcValue(inRange[0], inRange[1], inProgress);
          if(outRange) return calcValue(outRange[0], outRange[1], outProgress);

          return inRange[1];
        }

        //In Animation
        const translateInProgress = calcProgress(object.translate_in[2], scrollProgress);
        const opacityInProgress = calcProgress(object.opacity_in[2], scrollProgress);

        //Out Animation
        const translateOutProgress = calcProgress(object.translate_out?.[2] || [1, 1], scrollProgress);
        const opacityOutProgress = calcProgress(object.opacity_out?.[2] || [1, 1], scrollProgress);

        const x = getAnimatedValue( //translateX 값
          translateInProgress,
          translateOutProgress,
          [object.translate_in[0].x, object.translate_in[1].x],
          // [object.translate_out && object.translate_out[0].x, object.translate_out[1].x]
          object.translate_out
            ? [object.translate_out[0].x, object.translate_out[1].x]
            : undefined
        );

        const y = getAnimatedValue( //translateY 값
          translateInProgress,
          translateOutProgress,
          [object.translate_in[0].y, object.translate_in[1].y],
          // [object.translate_out && object.translate_out[0].y, object.translate_out[1].y]
          object.translate_out
            ? [object.translate_out[0].y, object.translate_out[1].y]
            : undefined
        );

        const opacity = getAnimatedValue( //opacity 값
          opacityInProgress,
          opacityOutProgress,
          [object.opacity_in[0], object.opacity_in[1]],
          // object.opacity_out && [object.opacity_out[0], object.opacity_out[1]]
          object.opacity_out
            ? [object.opacity_out[0], object.opacity_out[1]]
            : undefined
        );

        return { opacity, transform: `translate(${x}px, ${y}px)` };
      });

      setAnimationStyles(newStyles);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, [containerRef, options, setAnimationStyles]);
}

export const useCanvas = () => {
  const {
    containerRef,
    canvasRef,
    images,
    totalImages
  } = useContext(ScrollContext);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const calcScrollData = () => {
      const scrollY = window.scrollY; //현재 스크롤 위
      const maxScroll = container.scrollHeight - window.innerHeight;//최대 스크롤 가능 범위
      const scrollProgress = Math.min(scrollY / maxScroll, 1); //진행률
      const imageIndex = Math.floor(scrollProgress * (totalImages - 1)); //현재 보이는 이미지 순서

      return { scrollProgress, imageIndex };
    };

    const renderImage = (imageIndex) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if(images.length > 0) {
        const { imageIndex } = calcScrollData();

        if(images[imageIndex] && images[imageIndex].complete) {
          renderImage(imageIndex);
        }
      }
    };

    const handleScroll = () => {
      if (!containerRef.current || images.length === 0) return;

      const { imageIndex } = calcScrollData();

      if (images[imageIndex] && images[imageIndex].complete) {
        renderImage(imageIndex);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      resizeCanvas();
    }, 100)

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [canvasRef, containerRef, images, totalImages]);
}
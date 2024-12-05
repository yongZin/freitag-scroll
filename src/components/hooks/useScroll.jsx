//스크롤 관련 커스텀 훅
import { useContext, useEffect, useRef } from "react"
import { ScrollContext } from "../context/ScrollContext"

const throttle = (func, limit) => {
  // 스로틀링 유틸리티 함수(이벤트 호출 빈도 제한)
  let inThrottle;

  return (...args) => {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);

      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  }
};

export const useObserver = (sectionId, contentRef, canvasRef) => {
  const { setActiveSection } = useContext(ScrollContext);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤 위치(페이지 전체)
      const section = document.getElementById(sectionId);
      
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        //특정 섹션내에서 스크롤할 경우(현재 스크롤 위치가 특정 섹션내에 있는지)
        setActiveSection({
          id: sectionId,
          contentRef,
          canvasRef
        });
      }

      lastScrollTop.current = scrollTop; //현재 스크롤 위치 저장
    }, 100); // 100ms마다 실행(호출빈도 제한)

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionId, contentRef, canvasRef, setActiveSection]);
};

export const useAnimation = () => { //스크롤 애니메이션(메시지, 배경)
  const {
    activeSection,
    objects,
    setAnimationStyles
  } = useContext(ScrollContext);

  useEffect(() => {
    if(!activeSection || !activeSection.contentRef) return;

    const content = activeSection.contentRef.current;

    const handleScroll = () => {
      const scrollY = window.scrollY; //현재 스크롤 위치
      const maxScroll = content.scrollHeight - window.innerHeight; //최대 스크롤 가능 범위
      const scrollProgress = Math.min(scrollY / maxScroll, 1); //진행률

      const newStyles = objects.reduce((acc, object) => {
        const translateIn = object.translate_in; //translate 시작 값
        const translateOut = object.translate_out; //translate 끝 값
        const opacityIn = object.opacity_in; //opacity 시작 값
        const opacityOut = object.opacity_out; //opacity 끝 값
        
        const calcProgress = ({start, end}, progress) => {
          //현재 애니메이션 진행률
          if(progress < start) return 0;
          if(progress > end) return 1;

          return (progress - start) / (end - start);
        }

        const calcValue = (startValue, endValue, progress) => {
          return startValue + (endValue - startValue) * progress;
        }

        const getAnimatedValue = (inProgress, outProgress, inRange, outRange) => {
          if(inProgress < 1) return calcValue(inRange[0], inRange[1], inProgress);
          if(outRange) return calcValue(outRange[0], outRange[1], outProgress);

          return inRange[1];
        }
        
        const translateInValue = translateIn
          ? translateIn[2]
          : { start: 0, end: 1 };
        const opacityInValue = opacityIn
          ? opacityIn[2]
          : { start: 0, end: 1 };
        const translateOutValue = translateOut
          ? translateOut[2]
          : { start: 1, end: 1 };
        const opacityOutValue = opacityOut
          ? opacityOut[2]
          : { start: 1, end: 1 };

        const translateInProgress = calcProgress(translateInValue, scrollProgress);
        const opacityInProgress = calcProgress(opacityInValue, scrollProgress);
        const translateOutProgress = calcProgress(translateOutValue, scrollProgress);
        const opacityOutProgress = calcProgress(opacityOutValue, scrollProgress);

        const x = getAnimatedValue(
          translateInProgress,
          translateOutProgress,
          [translateIn[0].x, translateIn[1].x],
          translateOut
            ? [translateOut[0].x, translateOut[1].x]
            : undefined
        );

        const y = getAnimatedValue(
          translateInProgress,
          translateOutProgress,
          [translateIn[0].y, translateIn[1].y],
          translateOut
            ? [translateOut[0].y, translateOut[1].y]
            : undefined
        );

        const opacity = getAnimatedValue(
          opacityInProgress,
          opacityOutProgress,
          [opacityIn[0], opacityIn[1]],
          opacityOut
            ? [opacityOut[0], opacityOut[1]]
            : undefined
        );

        acc[object.target] = { 
          opacity, 
          transform: `translate(${x}px, ${y}px)` 
        };

        return acc;
      }, {});
      
      setAnimationStyles(newStyles);
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, objects, setAnimationStyles]);
}

export const useCanvas = () => {
  const {
    activeSection,
    images,
    totalImages
  } = useContext(ScrollContext);

  useEffect(() => {
    if (!activeSection || !activeSection.canvasRef || !activeSection.contentRef) return;

    const content = activeSection.contentRef.current;
    const canvas = activeSection.canvasRef.current;
    const ctx = canvas.getContext("2d");

    const calcScrollData = () => {
      const scrollY = window.scrollY; //현재 스크롤 위
      const maxScroll = content.scrollHeight - window.innerHeight;//최대 스크롤 가능 범위
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
      if (!content || images.length === 0) return;

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
  }, [activeSection, images, totalImages]);
}
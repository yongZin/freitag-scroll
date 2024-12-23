//스크롤 관련 커스텀 훅
import  { useContext, useEffect } from "react"
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

export const useSections = (containerRef) => { //섹션 정보 가져오기
  const { setSections } = useContext(ScrollContext);

  useEffect(() => {
    if(!containerRef.current) return; //containerRef가 없다면 리턴

    const children = Array.from(containerRef.current.children); //섹션 정보 가져오기(콘텐츠)

    const sectionsData = children.reduce((acc, child) => {
      const id = child.id;

      if(id) {
        acc[id] = {
          id,
          active: false,
          contentRef: { current: child },
          canvasRef: { current: child.querySelector("canvas") || null },
          animationStyles: {},
        };
      }

      return acc;
    }, {});

    setSections(sectionsData);
  }, [containerRef, setSections]);
};

export const useObserver = (containerRef) => { //활성화된 섹션 찾기
  const { setSections } = useContext(ScrollContext);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if(!containerRef.current) return; //containerRef가 없다면 리턴

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤 위치

      const children = Array.from(containerRef.current.children); //섹션 정보 가져오기(콘텐츠)

      const updateSections = children.reduce((acc, child) => {
        const id = child.id;

        if(!id) return acc; //id가 없다면 리턴

        const sectionTop = child.offsetTop; //섹션의 스크롤 시작 값
        const sectionBottom = sectionTop + child.offsetHeight; //섹션의 스크롤 끝 값
        
        const isActive = scrollTop >= sectionTop && scrollTop < sectionBottom; //현재 위치가 sectionTop ~ sectionBottom 범위면 true

        acc[id] = { active: isActive };
        
        return acc;
      }, {});

      setSections((prevSections) => {
        // 새로운 활성화된 섹션 찾기
        const activeIds = Object.keys(updateSections).filter(id => updateSections[id].active);

        // 모든 섹션의 active 상태 업데이트
        const updatedSections = Object.keys(prevSections).reduce((acc, id) => {
          acc[id] = {
            ...prevSections[id],
            // 현재 섹션이 활성화된 섹션 중 하나인지 확인
            active: activeIds.includes(id)
          };
          return acc;
        }, {});

        return updatedSections;
      });
      
    }, 100);

    handleScroll(); //최초 실핼
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef, setSections]);
};

export const useAnimation = () => { //스크롤 애니메이션(메시지, 배경)
  const { sections, objects, setAnimationStyles } = useContext(ScrollContext);

  useEffect(() => {
    const activeSectionId = Object.keys(sections).find(id => sections[id].active); //활성화 섹션 찾기
    
    if (!activeSectionId || !sections[activeSectionId].contentRef.current) return; //활성화 섹션 및 ref가 없다면 리턴
    
    const content = sections[activeSectionId].contentRef.current;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤 위치
      const sectionTop = content.offsetTop; //섹션 시작 위치
      const sectionHeight = content.scrollHeight; //섹션 전체 높이
      const sectionBottom = sectionTop + sectionHeight; //섹션 끝 위치
      
      const scrollProgress = Math.max(0, Math.min(
        //뷰포트 기준 섹션이 사라지면 진행률 100%
        (scrollTop - sectionTop) / (sectionBottom - sectionTop), 
        1
      ));

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
      
      setAnimationStyles(prevStyles => ({
        ...prevStyles,
        [activeSectionId]: newStyles
      }));
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, objects, setAnimationStyles]);
}

export const useCanvas = () => {
  const { sections, images, totalImages } = useContext(ScrollContext);

  useEffect(() => {
    if (!Object.keys(sections).length) return;

    const activeSection = Object.values(sections).find(section => section.active); //활성화 섹션 찾기

    if (!activeSection || !activeSection.canvasRef.current || !activeSection.contentRef.current) return; //활성화 섹션 및 ref가 없다면 리턴

    const content = activeSection.contentRef.current;
    const canvas = activeSection.canvasRef.current;
    const ctx = canvas.getContext("2d");

    const calcScrollData = () => {
      const scrollY = window.scrollY; //현재 스크롤 위치
      const sectionTop = content.offsetTop //섹션 시작 위치
      const sectionHeight = content.scrollHeight //섹션 높이
      const sectionBottom = sectionTop + sectionHeight; //섹션 끝 위치

      if (scrollY < sectionTop || scrollY >= sectionBottom) {
        return { scrollProgress: 0, imageIndex: 0 }; // 섹션을 벗어나면 기본값 반환
      }

      const maxScroll = sectionHeight - window.innerHeight; //섹션의 최대 스크롤 가능 범위
      const sectionScrollY = Math.max(0, Math.min(scrollY - sectionTop, maxScroll)); //섹션 내의 현재 스크롤 위치
      const scrollProgress = Math.min(sectionScrollY / maxScroll, 1); //섹션 내 현재 진행률

      const imageIndex = Math.floor(scrollProgress * (totalImages - 1)); //진행률에 대한 이미지 인덱스

      return { scrollProgress, imageIndex };
    };
    
    const renderImage = (imageIndex) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[imageIndex], 0, 0, canvas.width, canvas.height);
      
    };

    const resizeCanvas = () => {
      const isDetailSection = activeSection && activeSection.id === 'detail-section';

      if(isDetailSection) {
        canvas.width = window.innerWidth < 823 ? window.innerWidth : 823;
        canvas.height = window.innerHeight < 558 ? window.innerWidth : 558; 
      } else{
        canvas.width = window.innerWidth - 15; //스크롤바 크기 제외
        canvas.height = window.innerHeight;
      }
      
      if(images.length > 0) {
        const { imageIndex } = calcScrollData();

        if(images[imageIndex] && images[imageIndex].complete) {
          renderImage(imageIndex);
        }
      }
    };

    const handleScroll = throttle(() => {
      if (!content || images.length === 0) return;

      const { imageIndex } = calcScrollData();

      requestAnimationFrame(() => {
        if (images[imageIndex] && images[imageIndex].complete) {
          renderImage(imageIndex);
        }
      })
    }, 50);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);

    setTimeout(resizeCanvas, 100); //초기 렌더링

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, images, totalImages]);
}


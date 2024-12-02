//스크롤 관련 커스텀 훅
import { useEffect, useRef } from 'react';
import { useScroll } from '../contexts/ScrollContext';

export const useIntersectionObserver = (sectionIndex, options = {}) => {
  const ref = useRef(null);
  const { updateScene } = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;
          updateScene(sectionIndex, ratio);
        }
      });
    }, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
			// 0부터 1까지 0.01 단위로 threshold 생성
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [sectionIndex, updateScene, options]);

  return ref;
};
import { useContext, useEffect } from "react";
import { SectionContext } from "../context/SectionContext";

export const useCanvasImages = () => { //캔버스 이미지 저장
	const { sectionConfig, setSectionConfig } = useContext(SectionContext);

	useEffect(() => {
		if (sectionConfig.length === 0) return; //sectionInfo에 정보가 없다면 리턴
		
		const updatedSectionInfo = sectionConfig.map((section) => {
			if(!section.canvas || !section.canvas.values) return section; //canvas 정보가 없으면 리턴

			if (section.canvas.values.images && 
				section.canvas.values.images.length === section.canvas.values.imageCount) {
				return section; //imageCount만큼 완료되면 종료
			}

			const { imageSrc, imageType, imageCount } = section.canvas.values;

			const images = Array.from({ length: imageCount }, (_, i) => {
				const image = new Image();

				image.src = `${imageSrc}${i + 1}.${imageType}`;

				return image;
			});

			return {
				...section,
				canvas: {
					...section.canvas,
					values: {
						...section.canvas.values,
						images
					}
				}
			}
			
		});

		const hasChanges = updatedSectionInfo.some((section, index) => 
			section.canvas?.values?.images?.length !== sectionConfig[index]?.canvas?.values?.images?.length
		);

		if (hasChanges) { //sectionInfo 최신화(이미지 추가)
			setSectionConfig(updatedSectionInfo);
		}
	}, [sectionConfig, setSectionConfig]);
};

export const useLayout = (containerRef) => { //섹션 스크롤 값 계산
  const { sectionConfig, setSectionConfig } = useContext(SectionContext);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = Array.from(containerRef.current.children);
    
    const updatedSectionInfo = sectionConfig.map((section) => {
      const sectionElement = children.find( //해당 ID를 가진 섹션 요소 찾기
        (child) => child.id === section.id
      );

      if (!sectionElement) return section;

      //섹션의 위치 계산
      const sectionTop = sectionElement.offsetTop; //섹션별 스크롤 시작 값
      const sectionHeight = sectionElement.offsetHeight; //섹션별 전체 높이 값
      const sectionBottom = sectionTop + sectionHeight; //섹션별 스크롤 끝 값

      return {
        ...section,
				sectionHeight,
        sectionTop,
        sectionBottom
      };
    });

    const hasChanges = updatedSectionInfo.some((newSection, index) => {
      //변경사항이 있는 경우에만 상태 업데이트
      const oldSection = sectionConfig[index];

      return (
        newSection.sectionTop !== oldSection.sectionTop ||
        newSection.sectionBottom !== oldSection.sectionBottom
      );
    });

    if (hasChanges) {
      setSectionConfig(updatedSectionInfo);
    }
  }, [containerRef, sectionConfig, setSectionConfig]);
};

export const useActive = () => { //활성화 섹션 찾기
	const { sectionConfig, setActiveSection } = useContext(SectionContext);

	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤 위치
	
			const activeSection = sectionConfig.find((section) => {
				//섹션별 시작 ~ 끝 값과 currentScroll를 비교
				const active = currentScroll >= section.sectionTop && currentScroll < section.sectionBottom
				
				return active;
			});
	
			if(activeSection) setActiveSection(activeSection.id);
		}
	
		window.addEventListener('scroll', handleScroll);
		
		return () => window.removeEventListener('scroll', handleScroll);
	}, [sectionConfig, setActiveSection]);
};

export const useAnimation = () => {
	const { activeSection, sectionConfig } = useContext(SectionContext);
	
	useEffect(() => {
		let ticking = false;

		if(!activeSection && sectionConfig === 0) return; //활성화 섹션 정보가 없다면 리턴

		const handleCanvas = ( ///Canvas 이미지 시퀀스 애니메이션
			videoImageConfig,
			images,
			sectionScrollRatio,
			canvasElement
		) => {
			const [start, end, { start: animStart, end: animEnd }] = videoImageConfig;
			const ctx = canvasElement.getContext("2d");

			//Canvas 크기 설정
			const canvasParent = canvasElement.parentElement.getBoundingClientRect(); //부모요소 크기 참조(스크롤바 제외된 크기)
			canvasElement.width = canvasParent.width;
			canvasElement.height = canvasParent.height;

			if(activeSection === "detail-section") {
				//detail-section Canvas 최대 사이즈 지정

				if(canvasParent.width >= 840) {
					canvasElement.width = 822;
					canvasElement.height = 558;
				} else{
					canvasElement.width = canvasParent.width - 10;
					canvasElement.height = canvasElement.width / 1.4735;
				}
			}

			if(sectionScrollRatio >= animStart && sectionScrollRatio <= animEnd) {
				const normalizedRatio = (sectionScrollRatio - animStart) / (animEnd - animStart);
				const imageIndex = Math.floor(normalizedRatio * (end - start + 1)) + start;
				const img = images[imageIndex - 1];
	
				if(img && img.complete && img.naturalWidth !== 0) {
					ctx.drawImage(
						img,
						0, 0,
						canvasElement.width,
						canvasElement.height
					);
				}
			}
		};

		const calcProgress = (animConfig, scrollProgress) => {
			//진행률 계산(정확한 시작과 끝 값 전달)
			const { start, end } = animConfig;

			if (scrollProgress < start) return 0;
			if (scrollProgress > end) return 1;
			
			return (scrollProgress - start) / (end - start);
		};

		const handleAnimation = (animConfig, sectionScrollRatio) => {
			const { in: animIn, out: amimOut } = animConfig; //애니메이션 정보
			const [Instart, Inend, Inconfig] = animIn; //in 애니메이션 정보
			const [Outstart, Outend, Outconfig] = amimOut; //out 애니메이션 정보
		
			if (sectionScrollRatio <= Inconfig.start) {
				//in 시작 전 정확한 시작 값 전달
				return Instart;
			}
		
			if (
				sectionScrollRatio >= Inconfig.start &&
				sectionScrollRatio <= Inconfig.end
			) {
				//in 애니메이션 진행 중
				const progress = calcProgress(Inconfig, sectionScrollRatio);

				return Instart + (Inend - Instart) * progress;
			}
		
			if (
				sectionScrollRatio > Inconfig.end &&
				sectionScrollRatio < Outconfig.start
			) {
				//in 종료 후 정확한 종료 값 전달
				return Inend;
			}
		
			if (
				sectionScrollRatio >= Outconfig.start &&
				sectionScrollRatio <= Outconfig.end
			) {
				//out 애니메이션 진행 중
				const progress = calcProgress(Outconfig, sectionScrollRatio);

				return Outstart + (Outend - Outstart) * progress;
			}
		
			if (sectionScrollRatio > Outconfig.end) {
				//out 종료 후 정확한 종료 값 전달
				return Outend;
			}
		
			return Instart; // 기본값
		};

		const handleScroll = () => {
			const currentScroll = window.pageYOffset || document.documentElement.scrollTop; //현재 스크롤 위치
			const currentSectionConfig = sectionConfig.find( //활성화 섹션 찾기
				(section) => section.id === activeSection
			);
			

			if(currentSectionConfig) {
				const { sectionHeight, sectionTop } = currentSectionConfig; //섹션의 높이 및 스크롤 시작, 끝 값
				const sectionScrollRatio = Math.max(0, Math.min( //진행률
					(currentScroll - sectionTop) / sectionHeight,
					1
				));

				Object.entries(currentSectionConfig).forEach(([key, config]) => {
					if(config.target && config.values) {
						const element = config.target.current;

						if(config.values.videoImage) { //Canvas
							handleCanvas(
								config.values.videoImage,
								config.values.images,
								sectionScrollRatio,
								element
							);
						}

						if (config.values.opacity) { //Opacity
              const opacity = handleAnimation(
                config.values.opacity,
                sectionScrollRatio
              );

              element.style.opacity = opacity;
            }

						if (config.values.translate) { //Translate
              const translate = handleAnimation(
                config.values.translate,
                sectionScrollRatio
              );

              element.style.transform = `translateY(${translate}px)`;
            }
					}
				});
			}
		}

		const requestHandleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();

					ticking = false;
				});

				ticking = true;
			}
		};

		handleScroll(); //최초 실행

		window.addEventListener('scroll', requestHandleScroll);
		window.addEventListener("resize", requestHandleScroll);
		
		return () => {
			window.removeEventListener('scroll', requestHandleScroll);
			window.removeEventListener('resize', requestHandleScroll);
		}
	}, [activeSection, sectionConfig]);
};
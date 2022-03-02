export const handleSwiperProgress = (swiper) => {
  const scaleStep = 0.2;
  const zIndexMax = swiper.slides.length;
  for (let i = 0; i < swiper.slides.length; i += 1) {
    const slideEl = swiper.slides[i];
    const slideProgress = swiper.slides[i].progress;
    const absProgress = Math.abs(slideProgress);
    let modify = 1;
    if (absProgress > 1) {
      modify = (absProgress - 1) * 0.3 + 1;
    }
    const opacityEls = slideEl.querySelectorAll('.carousel-slider-animate-opacity');
    const translate = `${slideProgress * modify * 50}%`;
    const scale = 1 - absProgress * scaleStep;
    const zIndex = zIndexMax - Math.abs(Math.round(slideProgress));
    slideEl.style.transform = `translateX(${translate}) scale(${scale})`;
    slideEl.style.zIndex = zIndex;
    if (absProgress > 3) {
      slideEl.style.opacity = 0;
    } else {
      slideEl.style.opacity = 1;
    }

    opacityEls.forEach((opacityEl) => {
      opacityEl.style.opacity = 1 - absProgress / 3;
    });
  }
};

export const handleSetTransition = (swiper, duration) => {
  for (let i = 0; i < swiper.slides.length; i += 1) {
    const slideEl = swiper.slides[i];
    const opacityEls = slideEl.querySelectorAll('.carousel-slider-animate-opacity');
    slideEl.style.transitionDuration = `${duration}ms`;
    opacityEls.forEach((opacityEl) => {
      opacityEl.style.transitionDuration = `${duration}ms`;
    });
  }
};

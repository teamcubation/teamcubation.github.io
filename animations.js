class CarouselAnimator {
    constructor(section, elementWidth) {
      this.section = section  
      this.elementWidth = elementWidth
      this.translateWidth = 0;
      this.loopCarousel = 0;
      this.animationInProgress = false;
      this.finished = false;
    }
  
    animate(state) {
      if (!this.animationInProgress) {
        this.translateWidth += this.elementWidth;
        this.loopCarousel += 1;
        this.animationInProgress = true;
  
        const translate = state === 'reverse' ? 0 : -this.translateWidth;
        const timeline = gsap.timeline({ paused: true });
  
        const animation = timeline.to(this.section, {
          x: translate,
          duration: 1,
          onComplete: () => {
            this.animationInProgress = false;
            if (this.loopCarousel >= 2) {
              this.finished = true;
            }
  
            if (state === 'reverse') {
              this.translateWidth = 0;
              this.loopCarousel = 0;
              this.finished = false;
            }
          },
        });
        animation.play();
      }
    }
  }

export default CarouselAnimator;
  
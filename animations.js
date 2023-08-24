
class CarouselAnimator {
    constructor(section, elementWidth, stop) {
      this.section = section  
      this.elementWidth = elementWidth
      this.translateWidth = 0;
      this.loopCarousel = 0;
      this.animationInProgress = false;
      this.finished = false;
      this.positionY = 0;
      this.stop = stop;
    }
    
    animate(state) {

      if (!this.animationInProgress) {
        this.animationInProgress = true;
        let translate;

        if(state === 'play-reverse') {
          translate = this.positionY + this.elementWidth;
          this.loopCarousel -= 1;
        };
        if(state === 'play') {
          translate = this.positionY - this.elementWidth;
          this.loopCarousel += 1;
        };
        if(state === 'reverse'){
          translate = 0;
        }

        const timeline = gsap.timeline({ paused: true });
        const animation = timeline.to(this.section, {
          x: translate,
          duration: 1,
          onComplete: () => {
            var style = window.getComputedStyle(this.section);
            var matrix = new WebKitCSSMatrix(style.transform);
            this.positionY = matrix.m41;
            this.animationInProgress = false;

            if (this.loopCarousel >= this.stop) {
              this.finished = true;
            }
  
            if (state === 'reverse') {
              this.loopCarousel = 0;
              this.finished = false;
            }
          },
        });
        animation.play();
      }
    }
  }

const incrementCounter = (element, counterValue, targetValue, incrementAmount, text) => {
  const delay = 20;
  const divisor = Math.ceil(targetValue / incrementAmount);
  let currentNumber = counterValue;

  for (let i = 1; i <= divisor; i++) {
    setTimeout(() => {
      currentNumber += incrementAmount;
      if (currentNumber > targetValue) {
        currentNumber = targetValue;
      }
      element.textContent = `${text?.prev ?? ''} ${currentNumber}${text?.next ?? ''}`;
    }, i * delay);
  }
}
  
export { CarouselAnimator, incrementCounter};
  
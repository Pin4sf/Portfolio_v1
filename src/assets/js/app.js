import Swiper,{Pagination,Navigation} from "swiper";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';

class DisableScrollPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScroll';
  
    static defaultOptions = {
      direction: '',
    };
  
    transformDelta(delta) {
      if (this.options.direction) {
        delta[this.options.direction] = 0;
      }
  
      return { ...delta };
    }
  }
  
  // load the plugin
  Scrollbar.use(DisableScrollPlugin);

  class AnchorPlugin extends ScrollbarPlugin {
    static pluginName = 'anchor';
  
    onHashChange = () => {
      this.jumpToHash(window.location.hash);
    };
  
    onClick = (event) => {
      const { target } = event;
  
      if (target.tagName !== 'A') {
        return;
      }
  
      const hash = target.getAttribute('href');
  
      if (!hash || hash.charAt(0) !== '#') {
        return;
      }
  
      this.jumpToHash(hash);
    };
  
    jumpToHash = (hash) => {
      const { scrollbar } = this;
  
      if (!hash) {
        return;
      }    
  
      // reset scrollTop
      scrollbar.containerEl.scrollTop = 0;
  
      scrollbar.scrollIntoView(document.querySelector(hash));
    };
  
    onInit() {
      this.jumpToHash(window.location.hash);
  
      window.addEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.addEventListener('click', this.onClick);
    }
  
    onDestory() {
      window.removeEventListener('hashchange', this.onHashChange);
  
      this.scrollbar.contentEl.removeEventListener('click', this.onClick);
    }
  }
  
  // usage
  Scrollbar.use(AnchorPlugin);


const bar = document.querySelector(".loading__bar--inner");
const counter_num = document.querySelector(".loading__counter--number");
let c = 0;

let barInterval = setInterval(() => {
    bar.style.width = c + "%";
    counter_num.innerHTML = c + "%";
    c++;
    if(c === 101) {
        clearInterval(barInterval);
        gsap.to(".loading__bar", {
            duration: 5,
            rotate: "90deg",
            left: "1000%",
        });
        gsap.to(".loading__text,.loading__counter", {
            duration: 1,
            opacity: 0,
        });
        gsap.to(".loading__box", {
            duration: 1.5,
            height: '500px',
            borderRadius: '50%',
        });
        gsap.to(".loading__svg", {
            duration: 10,
            opacity: 1,
            rotate: '360deg',
        });
        gsap.to(".loading__box", {
            delay: 2,
            border: 'none',
        });
        imagesLoaded(document.querySelectorAll('img'), () => {
            gsap.to(".loading", {
                delay: 2,
                duration: 2,
                zIndex: 1,
                background: 'transparent',
                opacity: 0.5,
            });
            gsap.to(".loading__svg", {
                delay: 2,
                duration: 100,
                rotate: '360deg',
            });
            gsap.to('header', {
                duration: 1,
                delay: 2,
                top: "0.5rem",
            });
            gsap.to('.socials', {
                duration: 1,
                delay: 2.5,
                bottom: "8rem",
            });
            gsap.to('.scrollDown', {
                duration: 1,
                delay: 3,
                bottom: "1rem",
            });
            gsap.to(".loading", {
                delay: 2,
                duration: 2,
                zIndex: 1,
                background: 'transparent',
                opacity: 0.5,
            });
            gsap.to(".loading__svg", {
                delay: 2,
                duration: 100,
                rotate: '360deg',
            });
            gsap.to('header', {
                duration: 1,
                delay: 2,
                top: "0.5rem",
            });
            gsap.to('.socials', {
                duration: 1,
                delay: 2.5,
                bottom: "8rem",
            });
            gsap.to('.scrollDown', {
                duration: 1,
                delay: 3,
                bottom: "1rem",
            });
            let options = {
                damping: 0.1,
                plugins: {
                    disableScroll: {
                      direction: 'x',
                    },
                  },
            }
            let pageSmootScroll = Scrollbar.init(document.body);
            scrollbar.track.xAxis.element.remove()
        });
    }
}, 20);

Swiper.use([Pagination, Navigation])
var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type : 'bullets',
    },
});

const swiper_container = document.querySelector(".swiper-wrapper")

const questions = [...document.querySelectorAll(".question")];
questions.map((question) => {
    let q_text = question.querySelector(".h3");
    question.addEventListener("click", () => {
        questions
            .filter((q => q !== question))
            .map((q) => q.classList.remove("open"));
        question.classList.toggle("open");
    });
});
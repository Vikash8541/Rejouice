function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#wrapper"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#wrapper", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#wrapper").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

locomotiveAnimation();

function cursorAnimation() {
  let cursor = document.getElementById("cursor");
  let homeBanner = document.querySelector(".home-banner");

  homeBanner.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      left: dets.x,
      top: dets.y,
      duration: 0.5,
    });
  });

  homeBanner.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
    });
  });
  homeBanner.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
    });
  });
}
cursorAnimation();

function page2Animation(text1, text2) {
  // Function to split the text into lines and wrap in span tags for each text argument
  function createSpans(text, textContainerClass) {
    const textContainer = document.querySelector(`.${textContainerClass}`);
    textContainer.innerHTML = ""; // Clear existing spans

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const aspectRatio = screenWidth / screenHeight;

    let wordsPerLine;

    // Adjust the number of words per line based on aspect ratio
    if (aspectRatio > 1) {
      // Landscape Mode
      wordsPerLine = 8; // More words per line in wider screens
    } else {
      // Portrait Mode
      wordsPerLine = 4; // Fewer words per line in narrower screens
    }

    // Split the text into words
    const words = text.split(" ");
    let currentLine = "";
    let lineWordCount = 0;

    // Loop through words and create spans for each line
    words.forEach((word, index) => {
      currentLine += word + " ";
      lineWordCount++;

      // Create a new span when the word count reaches the limit or it's the last word
      if (lineWordCount >= wordsPerLine || index === words.length - 1) {
        const span = document.createElement("span");
        span.classList.add("line");
        span.textContent = currentLine.trim();
        textContainer.appendChild(span);

        // Reset for the next line
        currentLine = "";
        lineWordCount = 0;
      }
    });
  }

  // Call createSpans on page load for both texts with different containers
  createSpans(text1, 'page-2-content');
  createSpans(text2, 'page-4-content');

  //  Add GSAP Concepts

  let t1 = gsap.timeline();

  // Animation for the first set of text
  t1.from(".heading-page-2 p", {
    y: 80,
    opacity: 0,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#wrapper",
      start: "top 70%",
      end: "top 30%",
      scrub: 2,
      toggleActions: "play none none reverse", // This line controls the behavior on scroll
    },
  });
  t1.from(".heading-page-4 p", {
    y: 80,
    opacity: 0,
    duration: 0.7,
    stagger:0.4,
    scrollTrigger: {
      trigger: ".page4",
      scroller: "#wrapper",
      start: "top 70%",
      end: "top 30%",
      scrub: 2,
      toggleActions: "play none none reverse", // This line controls the behavior on scroll
    },
  });

  // Animation for the first text container
  t1.from(".page-2-content span", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#wrapper",
      start: "top 70%",
      end: "top 10%",
      scrub: 2,
      toggleActions: "play none none reverse", // This line controls the behavior on scroll
    },
  });

  // Animation for the second text container
  t1.from(".page-4-content span", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".page4",
      scroller: "#wrapper",
      start: "top 70%",
      end: "top 10%",
      scrub: 2,
      toggleActions: "play none none reverse", // This line controls the behavior on scroll
    },
  });

  // Add event listener to adjust spans on window resize
  window.addEventListener("resize", () => {
    createSpans(text1, 'page-2-content');
    createSpans(text2, 'page-4-content');
  });
}

// Example usage of page2Animation function
page2Animation(
  "We are a venture firm and digital agency. Our mission is to transform founders' visions into remarkable brands. Choose traditional compensation or an equity offset through our Venture Model — your vision, your decision.",
  "We partner with up to 5 clients each year. This allows intense focus on the transformation and launch of your brand by our very best team, which is the only team we have. We specialize in working with startups that are revolutionizing their industries."
);


function page3Animation() {
  gsap.from(".heading-page-3 a", {
    y: 150,
    opacity: 0,
    stagger: 0.3,
    duration: 0.7,
    scrollTrigger: {
      trigger: ".page3",
      scroller: "#wrapper",
      start: "top 80%",
      end: "top 0%",
      scrub: 1,
      toggleActions: "play none none reverse", // This line controls the behavior on scroll
    },
  });
}

page3Animation();


function aboutAnimation(){
  gsap.from(".about .about-text a",{
    y:120,
    opacity:0,
    duration:0.7,
    stagger:0.3,
    scrollTrigger:{
      trigger:".about",
      scroller:"#wrapper",
      start:"top 80%",
      end:"top 40%",
      scrub:true,
      toggleActions:"play none none play"
    }
  })
}
aboutAnimation()


function footerAnimation(){

let footerLogoText = document.querySelector("footer .logo h2");

let textContainer = footerLogoText.textContent.trim();
let splittedText = textContainer.split("");

let clutter = "";

splittedText.forEach((item)=>{
  clutter += `<span>${item}</span>`;
})

footerLogoText.innerHTML = clutter;

gsap.from ("footer .logo h2 span",{
  y:-120,
  opacity:0,
  duration:1,
  stagger:0.2,
  scrollTrigger:{
    trigger:"footer",
    scroller:"#wrapper",
    start:"top 70%",
    end:"50% 40%",
    scrub:true,
    toggleActions:"play none none reverse"
  }
})

}

footerAnimation();


function swiperAnimation(){
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 20,
  slidesPerView: 4,
  initialSlide: 2,
  speed: 1000,
  loop: true,
  roundLengths: true,
  // mousewheel: true,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  // Responsive breakpoints
  breakpoints: {
    0:{
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768:{
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});
}

swiperAnimation();

function loader(){

let t1 = gsap.timeline();

let h3Loader = document.querySelector("#loader h3");
let textContent = h3Loader.textContent;

let splittedText = textContent.split(" ");

let clutter = " ";
splittedText.forEach((item)=>{
  clutter += `<span>${item}</span>`
})

h3Loader.innerHTML = clutter;

t1.from("#loader h3 span",{
  opacity:0,
  x:40,
  duration:1.5,
  stagger:0.1,
})
t1.to("#loader h3 span",{
  opacity:0,
  x:-40,
  duration:1.3,
  stagger:0.1,
})

t1.to("#loader",{
  opacity:0,
})

t1.to("#loader",{
  display:"none"
})

  let bannerHeading = document.querySelector(".banner-text h1");
  let h1Text = bannerHeading.textContent;
  let splitText = h1Text.split("");
  let clutter2 = "";
  splitText.forEach((item) => {
    clutter2 += `<span>${item}</span>`;
  });
  bannerHeading.innerHTML = clutter2;

  t1.from(".banner-text h1 span", {
    opacity: 0,
    y: 150,
    stagger: 0.1,
    duration: 0.7,
  });


}

loader();
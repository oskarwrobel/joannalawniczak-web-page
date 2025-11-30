import lottie, { AnimationDirection } from "lottie-web";
import logo from "./J_logo.json";
import "./roman.css";

export const render = () => {
  document.body.innerHTML =
    "<div class='roman-wrapper'><div class='roman roman-1'></div><div class='roman roman-2'></div><div class='roman roman-3'></div></div>";

  lottie.loadAnimation({
    container: document.querySelector(".roman-1"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: logo,
  });

  const roman2 = lottie.loadAnimation({
    container: document.querySelector(".roman-2"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    animationData: logo,
  });
  let direction: AnimationDirection = 1;
  roman2.setDirection(direction);
  roman2.addEventListener("complete", () => {
    direction = direction === 1 ? -1 : 1;
    roman2.setDirection(direction);
    roman2.play();
  });

  const roman3 = lottie.loadAnimation({
    container: document.querySelector(".roman-3"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: logo,
  });
  const roman3El = document.querySelector(".roman-3");
  roman3El.addEventListener("mouseenter", () => roman3.pause());
  roman3El.addEventListener("mouseleave", () => roman3.play());
};

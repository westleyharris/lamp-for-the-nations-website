// Lamp for the Nations – main JS

(function () {
  // Respect prefers-reduced-motion: don’t autoplay video in WELCOME
  var video = document.querySelector(".hero-title-video");
  if (video && window.matchMedia("(prefers-reduced-motion)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
  }
})();

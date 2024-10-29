let processor = {
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(function () {
      self.timerCallback();
    }, 0);
  },
  doLoad: function() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    let self = this;
    this.video.addEventListener("play", function() {
      self.width = self.video.videoWidth;
      self.height = self.video.videoHeight;
      self.timerCallback();
    }, false);
  },
  computeFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width , this.height );
    let frame = this.ctx1.getImageData(0, 0, this.width , this.height); // 캐릭터 부분
    frame.crossOrigin = "Anonymous";
    let frame1 = this.ctx1.getImageData(0, this.height / 2 , this.width , this.height / 2 ); // 흰색 영역 부분
    let l = frame.data.length;
    for (let i = 0; i < l; i++) {
      let r = frame1.data[i * 4 + 0];
      let g = frame1.data[i * 4 + 1];
      let b = frame1.data[i * 4 + 2];
     
      // console.log( frame.data[(i / 2) * 4 + 3])
      if (r < 130 && g < 130 && b < 130) {
        frame.data[i * 4 + 3] = 0;
      }
    }
    return;
  }
};
document.addEventListener("DOMContentLoaded", () => {
processor.doLoad();
});
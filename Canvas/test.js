function rapid_wv(param) {
    const canvas = param.container;
    const ctx = canvas.getContext("2d");
    const backgroundImage = new Image();
    backgroundImage.src = param.backgroundImage;
    backgroundImage.onload = function() {
      drawWaveImage();
    };
    function drawWaveImage() {
      const waveAmplitude = param.waveAmplitude;
      const waveFrequency = param.waveFrequency;
      const waveSpeed = param.waveSpeed;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < canvas.width; x++) {
        const yOffset = canvas.height - backgroundImage.height + waveAmplitude + waveAmplitude * Math.sin(x * waveFrequency + waveSpeed * Date.now());
        const waveImageHeight = backgroundImage.height - Math.abs(yOffset - (canvas.height - backgroundImage.height));
        ctx.drawImage(backgroundImage, x, 0, 1, waveImageHeight, x, yOffset, 1, waveImageHeight);
      }
      requestAnimationFrame(drawWaveImage);
    }
  }
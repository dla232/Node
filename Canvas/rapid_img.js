let animationFrameId;
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const goToFrameButton = document.getElementById('goToFrameButton');
    const frameNumberInput = document.getElementById('frameNumber');
    const reverseButton = document.getElementById('reverseButton');
    const currentFrameText = document.getElementById('currentFrame');
    let currentFrame = 0; // 현재 프레임 번호를 저장할 변수 추가
    const imageArray = [];
    function rapid_img(param) {
      const canvas = param.container;
      const ctx = canvas.getContext("2d");
      const max_count = param.count;
      const exe = param.exe;
      let imageLoadedCount = 0;
      const frameRate = param.frameRate || 30;
      const frameDuration = 1000 / frameRate; // 프레임 간격(ms)
      
      function imageLoaded() {
        imageLoadedCount++;
        if (imageLoadedCount === max_count) {
          // 이미지 로딩이 완료되면 애니메이션 시작
          if (param.auto) {
            start(); // 자동 재생 옵션이 활성화되면 시작
          }
        }
      }
      for (let x = 0; x < max_count; x++) {
        const img_url = param.path + x + exe;
        const image = new Image();
        image.src = img_url;
        image.onload = imageLoaded;
        imageArray.push(image);
      }
      // 역방향 애니메이션을 위한 플래그 추가
      let reverseAnimation = param.reverse || false;
      function playSequence(timestamp) {
        if (!lastFrameTime) {
          lastFrameTime = timestamp;
        }
        const elapsed = timestamp - lastFrameTime;
        if (elapsed >= frameDuration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imageArray[currentFrame], 0, 0);
          if (reverseAnimation) {
            // 역방향 애니메이션인 경우
            currentFrame = (currentFrame - 1) % max_count;
            if (currentFrame < 0) {
              currentFrame = max_count - 1; // count에서 0까지 감소하도록 설정
            }
          } else {
            // 정방향 애니메이션인 경우
            currentFrame = (currentFrame + 1) % max_count;
          }
          lastFrameTime = timestamp;
        }
        animationFrameId = requestAnimationFrame(playSequence);
        // 현재 프레임 번호 업데이트
        currentFrameText.textContent = `현재 프레임: ${currentFrame}`;
        return currentFrame;
      }
      function start() {
        if (!animationFrameId) {
          // 애니메이션이 정지 중이면 시작
          lastFrameTime = null; // 시작할 때 시간 초기화
          animationFrameId = requestAnimationFrame(playSequence);
        }
      }
      function stop() {
        if (animationFrameId) {
          // 애니메이션 정지
          cancelAnimationFrame(animationFrameId);
          animationFrameId = undefined;
        }
      }
      // 외부에서 역방향 애니메이션을 활성화하는 함수
      function reverseAnimationOn() {
        reverseAnimation = true;
      }
      // 외부에서 역방향 애니메이션을 비활성화하는 함수
      function reverseAnimationOff() {
        reverseAnimation = false;
      }
      function goToFrame() {
        // 입력된 프레임 번호로 이동
        const frameToGo = parseInt(frameNumberInput.value);
        if (!isNaN(frameToGo) && frameToGo >= 0 && frameToGo < max_count) {
          currentFrame = frameToGo;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imageArray[currentFrame], 0, 0);
        } else {
          alert("유효한 프레임 번호를 입력하세요.");
        }
      }
      startButton.addEventListener('click', start);
      stopButton.addEventListener('click', stop);
      goToFrameButton.addEventListener('click', goToFrame);
      reverseButton.addEventListener('click', () => {
        reverseAnimation = !reverseAnimation; // 역방향 플래그를 토글
      });
    }
    function getCurrentFrame() {
      return currentFrame;
    }
    function get_num() {
      const currentFrame = getCurrentFrame();
      console.log(currentFrame);
    }
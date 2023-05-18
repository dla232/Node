module.exports = {
    apps: [
      {
        name: 'FE_server',
        script: 'app.js', // 애플리케이션의 진입점 파일
        args: '--update-env', // 서버 중단 방지
        instances: 'max', // 인스턴스 수 (여러 대의 서버에서 실행하는 경우)
        exec_mode: 'cluster', // 클러스터 모드 (여러 인스턴스 실행)
        autorestart: true, // 자동 재시작 설정
        watch: true, // 파일 변경 감지 설정
        max_memory_restart: '1G', // 메모리 한도를 초과하면 재시작
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
    deploy: {
      production: {
        user: 'rapid',
        host: '52.79.239.204',
        ref: 'origin/main', // 원하는 브랜치를 지정하세요
        repo: 'git@github.com:dla232/node.git', // 프로젝트의 Git 저장소
        path: '/Node/Front_server/nextjs', // 프로젝트의 경로
        'post-deploy': 'npm install && pm2 reload pm2.config.js --env production',
      },
    },
  };
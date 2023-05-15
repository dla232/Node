<script>
    import { onMount } from "svelte";
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    import Chart from 'chart.js/auto';
    setTimeout(() => {
        document.getElementById("container").className += ' on';
    }, 0);
    function creat_chart(){
        var ctx = document.getElementById('skillsChart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'polarArea',
            data: {
            labels: ['Node(React,Svelte,Vue)', 'JavaScript', 'HTML', 'CSS'],
            datasets: [{
                label: '사용 가능한 점수',
                data: [70, 95, 95, 85],
                backgroundColor: ['rgba(54, 162, 235, 0.5)','rgba(255, 105, 180,0.5)','rgba(0, 255, 255,0.5)','rgba(148, 0, 211,0.5)'],
                borderColor: ['rgba(54, 162, 235, 1)','rgba(255, 105, 180,1)','rgba(0, 255, 255,1)','rgba(148, 0, 211,1)'],
                borderWidth: 1
            }]
            },
            options: {
                
            }
        });
    }
    onMount(async () => {
        creat_chart();
    });
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">About - 경력 기술서</h1>
    <!-- <dl>
        <dd>Name : 임설</dd>
        <dd>BirthDay : 2018.02.22</dd>
        <dd>Time : 12:32</dd>
        <dd>Father : 임관혁</dd>
        <dd>Weight : 2.48Kg</dd>
        <dd>Star : {a}</dd>
    </dl> -->
    <h1>임관혁</h1>
    <p>연락처 정보: <a href="tel:01089551465">010-8955-1465</a>/ rapid@neonx.co.kr</p>
    <h2>학력</h2>
    <table>
        <tr>
          <th>학위명</th>
          <th>학과</th>
          <th>대학 이름</th>
          <th>졸업 일자</th>
        </tr>
        <tr>
            <td style="text-align:center;">학사</td>
            <td style="text-align:center;">컴퓨터 소프트웨어 학과</td>
            <td style="text-align:center;">순천향대학교</td>
            <td style="text-align:center;">2012년</td>
        </tr>
      </table>
    
    <h2>경력</h2>
    <table>
        <colgroup>
            <col width="20%"/>
            <col width="20%"/>
            <col width="20%"/>
            <col width="*"/>
        </colgroup>
        <tr>
            <th>회사 이름</th>
            <th>직무</th>
            <th>재직 기간</th>
            <th>주요 업무 내용 및 성과</th>
          </tr>
        <tr>
          <td>(주)디큐</td>
          <td>솔루션 개발팀(CMS 개발)</td>
          <td>2012-08-15 ~ 2013-11-15</td>
          <td>PHP, JAVA , ASP CMS 개발 업무</td>
        </tr>
        <tr>
          <td>(주)아사달</td>
          <td>퍼블리싱팀(UX 개발팀 겸직)</td>
          <td>2013-11-15 ~ 2015-07-31</td>
          <td>인천공항 여권 발급 시스템 , 경찰청 범죄자 조회 시스템 , 그 외 다수 공공기관 홈페이지 구현 및 접근성 인증 마크 획득</td>
        </tr>
        <tr>
          <td>FunNC(강아지대통령)</td>
          <td>컨베젼스연구팀</td>
          <td>2015-08-03 ~ 2015-09-03</td>
          <td>자사 솔루션 개발 및 자사 쇼핑몰 PC 수정 및 모바일 신규 구축</td>
        </tr>
        <tr>
            <td>넥슨코리아</td>
            <td>라이브웹프론트엔드팀</td>
            <td>2015-10-19 ~ 재직중</td>
            <td>다수 라이브 게임 홈페이지 구현 및 리뉴얼 , 다수 프로모션 페이지 진행 (메이플 / 블루아카이브 / 크아 등)</td>
          </tr>
    </table>
    <h2>기술</h2>
    <canvas id="skillsChart"></canvas>
    
    <h2>프로젝트</h2>
    <table>
        <colgroup>
            <col width="20%"/>
            <col width="20%"/>
            <col width="*"/>
            <col width="20%"/>
        </colgroup>
        <tr>
            <th>프로젝트명</th>
            <th>내용</th>
            <th>역할 및 성과</th>
            <th>사용한 기술</th>
        </tr>
        <tr>
            <td>인천공항 리뉴얼<br/>여권조회 시스템</td>
            <td>인천공항 홈페이지 리뉴얼 / 여권조회 시스템 구축</td>
            <td>홈페이지 리뉴얼 / 여권조회 CMS 개발</td>
            <td>JSP / CSS / JavaScript</td>
        </tr>
        <tr>
            <td>강아지 대통령</td>
            <td>강아지 대통령 홈페이지 리뉴얼 / 모바일 신규 구축</td>
            <td>애견 용품 CMS 연동 / 모바일 신규 구축</td>
            <td>PHP / CSS / JavaScript</td>
        </tr>
        <tr>
            <td>메이플스토리</td>
            <td>메이플 스토리 홈페이지 리뉴얼 / 프로모션 페이지 작업</td>
            <td>홈페이지 리뉴얼 / 해당 게임 프로모션 풀페이지 및 유지보수</td>
            <td>HTML / CSS / JavaScript / Svelte / React</td>
        </tr>
        <tr>
            <td>블루아카이브</td>
            <td>블루아카이브 다국어 신규 구축 / 프로모션 페이지 작업</td>
            <td>홈페이지 신규 구축 / 해당 게임 신규 런칭 오픈 이벤트 작업</td>
            <td>HTML / CSS / JavaScript</td>
        </tr>
        <tr>
            <td>메이플M</td>
            <td>메이플M 모바일 / PC</td>
            <td>홈페이지 리뉴얼 / 프로모션 풀페이지 작업 / 인게임 프로모션 페이지 작업</td>
            <td>HTML / CSS / JavaScript</td>
        </tr>
        <tr>
            <td>바람의나라</td>
            <td>바람의 나라 홈페이지 리뉴얼 / 프로모션 페이지</td>
            <td>홈페이지 리뉴얼 / 프로모션 풀페이지 작업</td>
            <td>HTML / CSS / JavaScript</td>
        </tr>
        <tr>
            <td>IRENE</td>
            <td>TF 업무 타 부서 Vue 프로젝트 업무 지원요청</td>
            <td>해당 IRENE 프로젝트 Vue 플러그인 사용으로 인한 Component 분리 및 가이드 작업</td>
            <td>Vue / CSS / JavaScript</td>
        </tr>
        <tr>
            <td>TF(팀 환경 셋팅)</td>
            <td>팀내 Webpack 환경 셋팅</td>
            <td>사내 이미지 유출 방지 작업으로 이미지 자동 Hash 처리 환경 구축</td>
            <td>Webpack / JavaScript</td>
        </tr>
    </table>
    <ul style="margin-bottom:100px;">
        <li>진행 한 프로젝트양이 생각보다 많아 최근 진행 프로젝트와 기억에 남는 프로젝트 위주로 작성하였습니다.</li>
    </ul>
    
    
</div>
<style>
    a{color:#333;}
    h1 {
      color: #333;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    h2 {
      color: #555;
      font-size: 22px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    ul {
      list-style-type: disc;
      margin-left: 20px;
      margin-top:10px;
    }
    
    li {
      margin-bottom: 10px;
    }
    
    p {
      margin-bottom: 10px;
    }
    dl{width:100%; float:left; height:500px;}
    dl dd{font-size:16px;}
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    th {
      background-color: #f2f2f2;
    }
    canvas {
      max-width: 600px;
      max-height: 600px;
      margin-bottom: 20px;
    }
    
</style>
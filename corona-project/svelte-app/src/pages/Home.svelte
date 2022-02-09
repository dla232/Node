<script>
    import Chart from 'chart.js/auto';
    import {apiData} from "../store";
    import { onMount ,beforeUpdate } from 'svelte';
    const api_key = "OxwGNKdQBRaUs2jpIluJ5tbnE4H8FgzAD";
    let data ;
    let tb_data = [];
    let cn_name = [];
    let cn_cnt = [];
    let cn_cnt2 = [];
    let type_n ="bar";
    let myChart;
    async function cr_chart(i){
        type_n = i;
        $apiData = [];
        data = await fetch("https://api.corona-19.kr/korea/country/new/?serviceKey="+api_key).then(res => res.json())
        // data = JSON.stringify(data);
        let arry_data = Object.keys(data);
        let arry_data_len = arry_data.length;
        console.log(data[arry_data[3]]);
        cn_name = [];
        cn_cnt = [];
        cn_cnt2 = [];
        for(var i = 3; i < arry_data_len; i ++){
            let b = data[arry_data[i]]
            $apiData = [...$apiData,b];
            cn_name.push(b.countryName);
            cn_cnt.push(Number(b.newCase.replace(',','')));
            cn_cnt2.push(Number(b.totalCase.replace(',','')));
            console.log(cn_cnt);
            console.log(cn_name);
        }
        myChart.destroy();
        const ctx = document.getElementById("corona_chart");
        myChart = new Chart(ctx, {
            type: type_n,
            data: {
                labels: cn_name,
                datasets: [
                    {
                        label: '신규확진자',
                        data: cn_cnt,
                        backgroundColor: [
                            'rgba(255, 000, 000, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 000, 000, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: '총확진자',
                        data: cn_cnt2,
                        backgroundColor: [
                            'rgba(000, 255, 000, 0.2)',
                        ],
                        borderColor: [
                            'rgba(000, 255, 000, 1)',
                        ],
                        borderWidth: 1
                    },
                ]
            },
            
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    function test(){
        cr_chart(type_n);
    }
    onMount(async () =>{
        data = await fetch("https://api.corona-19.kr/korea/country/new/?serviceKey="+api_key).then(res => res.json())
        // data = JSON.stringify(data);
        console.log(data);
        let arry_data = Object.keys(data);
        let arry_data_len = arry_data.length;
        cn_name = [];
        cn_cnt = [];
        cn_cnt2 = [];
        for(var i = 3; i < arry_data_len; i ++){
            let b = data[arry_data[i]]
            $apiData = [...$apiData,b];
            cn_name.push(b.countryName);
            cn_cnt.push(Number(b.newCase.replace(',','')));
            cn_cnt2.push(Number(b.totalCase.replace(',','')));
        }
        console.log($apiData);
        const ctx = document.getElementById("corona_chart");
        myChart = new Chart(ctx, {
            type: type_n,
            data: {
                labels: cn_name,
                datasets: [
                    {
                        label: '신규확진자',
                        data: cn_cnt,
                        backgroundColor: [
                            'rgba(255, 000, 000, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 000, 000, 1)',
                        ],
                        borderWidth: 1
                    },
                    {
                        label: '총확진자',
                        data: cn_cnt2,
                        backgroundColor: [
                            'rgba(000, 255, 000, 0.2)',
                        ],
                        borderColor: [
                            'rgba(000, 255, 000, 1)',
                        ],
                        borderWidth: 1
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        //setInterval(test,3600000);
    });
</script>
<div class="center_wrap">
    <h1 class="title">코로나 현황</h1>
    <div class="char_wrap">
        <canvas id="corona_chart"></canvas>
    </div>
    <button on:click="{ () =>  cr_chart('line')}">
        라인
    </button>
    <button on:click="{ () =>  cr_chart('bar')}">
        바
    </button>
    <div class="tb_wrap">
        <table>
            <thead>
                <tr>
                    <th>도시</th>
                    <th>신규확진자</th>
                    <th>총 확진자</th>
                    <th>완치자수</th>
                    <th>사망자</th>
                </tr>
            </thead>
            <tbody>
                {#each $apiData as items,i}
                <tr>
                    <td>{items.countryName}명</td>
                    <td>{items.newCase}명</td>
                    <td>{items.totalCase}명</td>
                    <td>{items.recovered}명</td>
                    <td>{items.death}명</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
<style>
:global(.title) {
    /* your styles go here */
    width:100%; float:left; margin-top:40px; font-size:30px;

}
button{color:#fff; background-color:rgb(36, 108, 175); border:0; width:100px;}
.char_wrap{width:100%;float:left;}
.center_wrap{width:1280px; margin:0 auto; position:relative; overflow:hidden;}
.tb_wrap{width:100%; float:left; margin-bottom:100px;}
.tb_wrap table{width:100%; float:left; border:1px solid #666; text-align: center; padding:0; margin:0; table-layout: fixed; border-collapse: collapse; border-spacing: 0;}
.tb_wrap table tr th{line-height:50px; border-left:1px solid #666;}
.tb_wrap table tr th:first-child{border-left:0;}
.tb_wrap table tr td{border-top:1px solid #666; border-left:1px solid #666; line-height:30px;}
.tb_wrap table tr td:first-child{border-left:0;}
</style>
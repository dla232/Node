<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    const api_key = "OxwGNKdQBRaUs2jpIluJ5tbnE4H8FgzAD";
    let data ;
    let cn_name = [];
    let cn_cnt = [];
    let type_n ="bar";
    let myChart;
    async function cr_chart(i){
        type_n = i;
        data = await fetch("https://api.corona-19.kr/korea/country/new/?serviceKey="+api_key).then(res => res.json())
        // data = JSON.stringify(data);
        let arry_data = Object.keys(data);
        let arry_data_len = arry_data.length;
        console.log(data[arry_data[3]]);
        cn_name = [];
        cn_cnt = [];
        for(var i = 3; i < arry_data_len; i ++){
            let b = data[arry_data[i]]
            cn_name.push(b.countryName);
            cn_cnt.push(Number(b.newCase.replace(',','')));
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
                        label: '신규확진자2',
                        data: cn_cnt,
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
        let arry_data = Object.keys(data);
        let arry_data_len = arry_data.length;
        console.log(data[arry_data[3]]);
        cn_name = [];
        cn_cnt = [];
        for(var i = 3; i < arry_data_len; i ++){
            let b = data[arry_data[i]]
            cn_name.push(b.countryName);
            cn_cnt.push(Number(b.newCase.replace(',','')));
        }
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
                        label: '신규확진자2',
                        data: cn_cnt,
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
<h1>코로나 현황</h1>
<div class="char_wrap">
    <canvas id="corona_chart"></canvas>
    <canvas id="corona_chart2"></canvas>
</div>
<button on:click="{ () =>  cr_chart('line')}">
    라인
</button>
<button on:click="{ () =>  cr_chart('bar')}">
    바
</button>

<style>
.char_wrap{width:1000px; margin:0 auto;}
</style>
<script>
    import Header from "../include/header.svelte";
    import {img_url} from "../store";
    import Nav from "../include/nav.svelte";
    import Chart from 'chart.js/auto';
    import { onMount } from "svelte";
    onMount(function(){
        const ctx = document.getElementById("myChart");
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['18.02', '19.02', '20.02', '21.02', '22.02','22.07','22.08','22.09','22.10','22.11','22.12','23.01','23.02','23.03','23.04'],
                datasets: [{
                    label: '체중(Kg)',
                    data: [2.48, 6, 11, 13, 14.5 , 15.4, 16 , 16 , 17,18,18.5,18.7,18.8,19,19.2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        document.getElementById("container").className += ' on';
    });
    function test(){
        console.log("aa");
        // pause
        // play
    }
</script>
<Header />
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">Seol Weight</h1>
    <canvas id="myChart" style="width:100%; height:500px; background-color:#fff; float:left;"></canvas>
    <h1 class="d1_title">Seol Picture</h1>
    <div class="pic_wrap">
        <img src="{$img_url}star.jpg" alt="">
    </div>
    <h1 class="d1_title">Seol Mov</h1>
    <div class="pic_wrap">
        <video id="player" src="{$img_url}01.mp4" on:click="{test}" controls>
            <track kind="captions"/>
        </video>
    </div>
</div>
<style>
    .pic_wrap{width:100%; float:left; height:auto; border:0;}
    .pic_wrap img{width:100%;}
    .pic_wrap video{width:100%; float:left; border:0; background:none;}
</style>
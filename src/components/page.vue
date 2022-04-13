<template>
    <div class="addC">
        <div class="card-container">
            <el-card class="box-card">
                <div class="header-card">用户数</div>
                <div style="display: flex;">
                    <div style="font-size: 50px; color: #4a91e2; width: 100%">
                        10<span class="fab fa-creative-commons-by" style="font-size: 50px; color: #4a91e2; margin-left: 5px;"></span>
                    </div>
                </div>
                <div class="echarts1"></div>
            </el-card>
            <el-card class="box-card">
                <div class="header-card">讲座数量</div>
                <div style="display: flex;">
                    <div style="font-size: 50px; color: #4a91e2; width: 100%">
                        19<span class="fab fa-airbnb"
                            style="font-size: 50px; color: #4a91e2; margin-left: 5px;"></span>
                    </div>
                </div>
                <div class="echarts2"></div>
            </el-card>
            <el-card class="box-card1">
                <div class="header-card">功能</div>
                <div class="timeline">
                    <el-timeline>
                    <el-timeline-item v-for="(item) in active"
                        :timestamp="item">
                    </el-timeline-item>
                </el-timeline>
                </div>
            </el-card>
        </div>
        <el-card class="box-card2">
            <template #header>
                <div class="card-header" style="font-size: 20px;">
                    <span>公告</span>
                </div>
            </template>
            <div style="display: flex;">
                <div
                    style="font-size: 15px; display: inline-block; width: 700px; margin-right: 20px; text-align: left; font-weight: 100">
                    预约管理系统无纸化智能会议功能：实现讲座管理的主体功能：包括会登录注册, 讲座的预约发布, 以及人员信息修改, 签到的功能, 以及教室的相关信息操作。
                </div>
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="item in imgArr" :key="item.src">
                        <img :src="getImageUrl(item.src)" />
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
var option = {
    xAxis: {
        type: 'category',
        data: ['普通用户', '管理员']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [120, 200],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ]
};
var option1 = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: '10%'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
            ]
        }
    ]
};
const activitie = [
  {
    content: 'Event start',
    timestamp: '2018-04-15',
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13',
  },
  {
    content: 'Success',
    timestamp: '2018-04-11',
  },
]
const activities = ["登录", "发布讲座", "教室相关信息", "用户预约讲座", "进行现场签到"]
export default {
    name: "Add",
    data() {
        return {
            imgArr: [
                { src: '../images/111.jpg' },
                { src: '../images/222.jpg' },
                { src: '../images/333.jpg' },
                { src: '../images/444.jpg' },
            ],
            activities: activitie,
            active: activities
        }
    },
    mounted() {
        var chartDom = document.querySelector('.echarts1');
        var chartDom1 = document.querySelector('.echarts2');
        var myChart = echarts.init(chartDom);
        var myChart1 = echarts.init(chartDom1);
        option && myChart.setOption(option);
        option && myChart1.setOption(option1);
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../images/${name}`, import.meta.url).href
        }
    }
};
</script>

<style lang="scss">
.addC {
    margin-top: 60px;
    width: 100%;
    color: black;
    font-weight: bold;
    font-size: 30px;

    .card-container {
        width: 100%;
        display: flex;

        .box-card {
            width: 35%;
            height: 350px;
            margin-left: 10px;
        }

        .box-card1 {
            width: 30%;
            height: 350px;
            margin-left: 10px;
        }
    }

    .box-card2 {
        width: 99%;
        height: 200%;
        margin: 10px 10px;
    }
}

.title {
    margin-bottom: 20px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel {
    width: 40%;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

img {
    width: 100%;
    height: 100%;
}

.echarts1,
.echarts2 {
    height: 250px;
    width: 100%;
}

.header-card {
    height: 40px;
    width: 100%;
    background-color: #0099FF;
    color: #fff;
    margin-bottom: 10px;
}

.timeline {
    margin-top: 80px;
}
</style>

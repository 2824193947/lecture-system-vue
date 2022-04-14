<template>
    <div class="addC">
        <div class="card-container">
            <el-card class="box-card">
                <div class="header-card">日历</div>
                <div style="display: flex;">
                </div>
                <div class="hidden-scroll"
                    style="height: 259px; overflow: scroll; border-radius: 4px; border: 1px solid #d9d9d9;">
                    <a-calendar />
                </div>
                <div class="echarts1"></div>
            </el-card>
            <el-card class="box-card">
                <div class="header-card">讲座数量</div>
                <div style="display: flex;">
                    <div style="font-size: 50px; line-height: 50px; color: #4a91e2; width: 100%">
                        {{ this.option1.series[0].data[0].value }}<span class="fab fa-airbnb"
                            style="font-size: 50px; color: #4a91e2; margin-left: 5px;"></span>
                    </div>
                </div>
                <div class="echarts2"></div>
            </el-card>
            <el-card class="box-card1">
                <div class="header-card">功能</div>
                <div class="timeline">
                    <el-timeline>
                        <el-timeline-item v-for="(item) in active" :timestamp="item">
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
import LocalStorage from "../utils/store"
import { SelectLecture, SelectAppointment } from '../views/service'
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
const activities1 = ["登录", "用户预约讲座", "进行现场签到"]
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
            option1: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: '10%'
                },
                series: [
                    {
                        name: '讲座数量',
                        type: 'pie',
                        radius: ['35%', '60%'],
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
                            { value: 90, name: '讲座数量' },
                            { value: 5, name: '预约讲座数量' },
                        ]
                    }
                ]
            },
            activities: activitie,
            active: this.role ? activities : activities1,
            role: false,
           Username: LocalStorage.getLocalstore("studentInfo").name,
        }
    },
    created() {
        this.role = LocalStorage.getLocalstore("studentInfo").role === "admin" ? true : false
    },
    async mounted() {
        await new Promise(resolve => {
            this.sLecture()
            SelectAppointment(this.Username).then((res) => {
                this.option1.series[0].data[1].value = res.data.length
                console.log("🚀 ~ this.option1", this.option1.series[0].data)
                resolve()
            })
        })
        console.log(1111111111);
        var chartDom1 = document.querySelector('.echarts2');
        var myChart1 = echarts.init(chartDom1);
        this.option1 && myChart1.setOption(this.option1);
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../images/${name}`, import.meta.url).href
        },
        sLecture() {
            SelectLecture().then((res) => {
                this.option1.series[0].data[0].value = res.data.length
            })
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

        .box-card-role {
            width: 30%;
            height: 135px;
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
    border-radius: 5px;
}

.timeline {
    margin-top: 80px;
}

.hidden-scroll::-webkit-scrollbar {
    display: none;
}

.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
    height: 50px !important;
}
</style>

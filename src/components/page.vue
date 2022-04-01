<template>
    <div class="addC">
        <div class="title"><i class="fab fa-audible"></i>&nbsp&nbsp文博教育管理系统</div>
        <el-carousel :interval="4000" type="card" height="270px">
            <el-carousel-item v-for="item in imgArr" :key="item.src">
                <img :src="getImageUrl(item.src)" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: "Add",
    data() {
        return {
            imgArr: [
                { src: '../images/111.jpg' },
                { src: '../images/222.jpg' },
                { src: '../images/333.jpg' },
                { src: '../images/444.jpg' },
                { src: '../images/555.jpg' },
            ]
        }
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../images/${name}`, import.meta.url).href
        }
    }
};
</script>

<style>
.addC {
    margin-top: 100px;
    width: 100%;
    color: black;
    font-weight: bold;
    font-size: 30px;
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
    margin: 0 10px;
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
</style>

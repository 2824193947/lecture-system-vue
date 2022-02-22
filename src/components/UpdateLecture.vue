<template>
    <div :style="container">
        <el-container>
            <el-main>
                <h3>讲座修改</h3>
                <br />
                <el-divider>请输入</el-divider>
                <div style="width: 20%; position: relative; margin: auto">
                    <br />
                    <br />
                    <el-input v-model="ClassRoom" placeholder="请输入讲座教室名" />
                    <el-input v-model="lctureInfo" placeholder="请输入讲座名称" />
                    <br />
                    <el-button type="primary" icon="el-icon-edit" @click="Add">修改</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ref } from "vue";
import { UpdateLecture } from "../views/service.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
    name: "AddLcture",
    setup(props) {
        const container = {
            width: "100%",
        };
        const store = useStore();
        const ClassRoom = ref("");
        const lctureInfo = ref("")
        const Add = () => {
            UpdateLecture(lctureInfo.value, ClassRoom.value).then(
                (res) => {
                    console.log(res);
                    if (res.data === '修改讲座成功') {
                        ElMessage.success("修改成功！");
                    } else {
                        ElMessage.error("修改失败！");
                    }
                },
            );
        };
        return {
            container,
            ClassRoom,
            lctureInfo,
            Add,
            store,
        };
    },
};
</script>

<style lang="scss" scoped>
.el-input {
    margin-bottom: 10px;
}
</style>

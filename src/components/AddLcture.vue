<template>
    <div :style="container">
        <el-container>
            <el-main>
                <h3>讲座发布</h3>
                <br />
                <el-divider>请输入</el-divider>
                <div style="width: 20%; position: relative; margin: auto">
                    <br />
                    <br />
                    <el-input v-model="newClassRoom" placeholder="请输入讲座教室名" />
                    <el-input v-model="newClassRoom" placeholder="请输入讲座名称" />
                    <br />
                    <el-button type="primary" icon="el-icon-edit" @click="Add">新增</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { ref } from "vue";
import { AddRoom } from "../views/service.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
    name: "AddClassRoom",
    setup(props) {
        const container = {
            width: "100%",
        };
        const store = useStore();
        const newClassRoom = ref("");
        const Add = () => {
            AddRoom(newClassRoom.value).then(
                (res) => {
                    console.log(res);
                    store.commit("resDataT", res.data);
                    ElMessage.success("新增成功！");
                },
                (err) => {
                    ElMessage.error("新增失败！");
                }
            );
        };
        return {
            container,
            newClassRoom,
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

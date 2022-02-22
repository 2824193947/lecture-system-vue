<template>
  <div class="container">
		<el-container>
			<el-main>
					<h3>讲座查询</h3>
					<br />
          <el-table :data="tableData" height="600" style="width: 90%">
            <el-table-column prop="lectureinfo" label="预约讲座" width="180" />
            <el-table-column prop="classroomname" label="教室" width="900" />
          </el-table>
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { SelectLecture } from '../views/service'
let tableData = ref([])

onMounted(() => {
  SelectLecture().then((res) => {
    console.log(res.data);
    tableData.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
	width: 100%;
  height: 100vh;
}
</style>

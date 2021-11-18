<template>
  <div id="app">
    <div class="main">
      <h1>移动窗口测试</h1>
      <br />
      <el-form label-width="80px">
        <el-form-item label="窗口名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="x">
          <el-input-number v-model="form.x" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="y">
          <el-input-number v-model="form.y" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="moveWindow">发送指令</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts'>
const { ipcRenderer } = require("electron");
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
export default {
  name: "app",
  setup() {
    const loaded = () => {
      const appLoading = document.getElementById("appLoading");
      if (appLoading) appLoading.style.display = "none";
    };
    const form = reactive({
      title: "记事本",
      x: 0,
      y: 0,
    });
    const moveWindow = () => {
      ipcRenderer.send("ACTION", {
        action: "MoveWindowByTitle",
        data: JSON.parse(JSON.stringify(form)),
      });
    };
    onMounted(() => {
      ipcRenderer.on("PUBLIC", (e: any, { event, data }) => {
        if (event === "error-message") {
          ElMessage.error(data);
        }
      });
      loaded();
    });
    return { form, moveWindow };
  },
};
</script>

<style lang="scss">
.main {
  width: 90vw;
  margin: 5vh auto;
}
</style>
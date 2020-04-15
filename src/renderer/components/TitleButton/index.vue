<template>
  <div class="title-button" :style="titleButtonStyle">
    <el-row>
      <el-col :span="colSpan">
        <!-- 设置 -->
        <el-button type="text" @click="click('setting')">
          <svg-icon icon-class="setting" />
        </el-button>
      </el-col>
      <el-col :span="colSpan">
        <!-- 最小化 -->
        <el-button type="text" @click="click('minimize')">
          <svg-icon icon-class="minimize" />
        </el-button>
      </el-col>
      <el-col v-if="showMaximize" :span="colSpan">
        <!-- 最大化 -->
        <el-button v-if="canMaximize" type="text" @click="click('maximize')">
          <svg-icon icon-class="maximize" />
        </el-button>
        <el-button v-else type="text" @click="click('unmaximize')">
          <svg-icon icon-class="unmaximize" />
        </el-button>
      </el-col>
      <el-col :span="colSpan">
        <!-- 关闭 -->
        <el-button type="text" @click="click('close')">
          <svg-icon icon-class="close" />
        </el-button>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  const { ipcRenderer: ipc, remote } = require('electron')
  export default {
    name: 'TitleButton',
    props: {
      showMaximize: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        titleButtonStyle: {
          width: '135px'
        },
        colSpan: 8,
        canMaximize: true
      }
    },
    mounted () {
      // 设置最大化按钮是否显示
      if (this.showMaximize) {
        this.titleButtonStyle.width = '180px'
        this.colSpan = 6
        this.canMaximize = !remote.getCurrentWindow().isMaximized()
      }
    },
    methods: {
      /**
       * 点击事件
       */
      click (type) {
        switch (type) {
          case 'setting':
            break
          case 'minimize':
          case 'close':
            ipc.send(type)
            break
          case 'maximize':
          case 'unmaximize':
            console.info(type)
            ipc.send(type)
            this.canMaximize = !this.canMaximize
            break
        }
      }
    }
  }
</script>

<style>
  .title-button {
    position: absolute;
    width: 135px;
    height: 25px;
    top: 0;
    right: 0;
    padding: 0;
    border: 0;
    -webkit-app-region: no-drag;
  }

  .title-button .el-col {
    width: 45px;
    height: 25px;
  }

  .title-button .el-col:hover {
    background-color: #dadada;
  }

  .title-button .el-col .el-button {
    width: 45px;
    height: 25px;
    border: 0;
    padding: 0;
    margin: 0;
    background-size: 60% 60%;
    background-position: center;
    color: black;
  }
</style>
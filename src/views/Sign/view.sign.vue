<template>
  <div class="container">
    <navigation :showBack="true" :title="'电子签名法'"></navigation>
    <div class="canvasBox" ref="canvasHW">
      <canvas
        width="100%"
        height="100"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        ref="canvasF"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></canvas>
      <div class="btnBox">
        <button @click="overwrite">重写</button>
        <button @click="againSign">提交签名</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import InfoService from '@/api/info';

export default {
  name: 'sign',
  data () {
    return {
      points: [],
      canvasTxt: null,
      stage_info: [],
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,

      contractId: '', // 合同id
      customId: '', // 客户id
      contractImage: '', // 合同图片地址
    };
  },
  created () {
    const info = this.$route.params;

    this.contractId = info.contractId;
    this.customId = info.customId;
    this.contractImage = info.contractImage;
  },
  mounted () {
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasHW.offsetHeight - 48;
    canvas.width = this.$refs.canvasHW.offsetWidth;
    this.canvasTxt = canvas.getContext("2d");
    this.stage_info = canvas.getBoundingClientRect();
  },
  methods: {
    againSign () {
      let base64 = this.$refs.canvasF.toDataURL("image/png");

      base64 = base64.replace('data:image/png;base64,', '');

      const params = {
        customId: parseInt(this.customId),
        progress: 2,
        contractImage: base64
      };

      InfoService.uploadSign(`/contract/sign/${this.contractId}`, params).then((res) => {
        if (res.code === '1000') {
          this.contractImg = res.result.contractImage // 最终合同图片

          const a = {
            progress: 2,
            contractImage: res.result.contractImage,
            customId: this.customId,
            contractId: this.contractId
          };

          this.$router.push({ name: 'contractImg', params: a });
        }
      });
    },
    //电脑设备事件
    mouseDown (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };

        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
      }
    },
    //移动设备事件
    touchStart (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseMove (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //移动设备事件
    touchMove (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length === 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    // 电脑设备事件
    mouseUp (ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    // 移动设备事件
    touchEnd (ev) {
      ev = ev || event;
      ev.preventDefault();

      if (ev.touches.length === 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
      }
    },
    // 重写
    overwrite () {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}

.canvasBox {
  flex: 1;
  position: relative;
}

.btnBox {
  position: absolute;
  display: flex;
  margin: 0 1rem;
  width: calc(100% - 2rem);
  height: 3rem;
  top: 1rem;
  justify-content: space-between;
  align-items: center;
  button {
    width: 7rem;
    height: 100%;
    border: none;
    line-height: 2.4rem;
    text-align: center;
    padding: 0 1rem;
    background: #FC3B40;
    border-radius: 0.2rem;
    font-size: 1.2rem;
    color: #FFF;
  }
}
</style>

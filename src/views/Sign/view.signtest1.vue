<template>
  <div class="signature">
    <navigation :showBack="true" :title="'电子签名法'"></navigation>
    <!-- 电子签名 -->
    <div class="canvas">
      <canvas
        id="myCanvas"
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
      </canvas>
    </div>

    <button class="btn reset" @click="overwrite">重写</button>
    <button class="btn commit" @click="againSign">提交签名</button>
  </div>
</template>

<script>
export default {
  name: 'signtest',
  data () {
    return {
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight - 48,
      canvasImg: '', // 签名图片地址
      ctx: null, // 画板
      stage_info: [], // 移动端按下点到屏幕的偏差
      isDown: false, // 是否按下
      points: [], // 按下点组合
      startX: 0, // 起始点x坐标
      startY: 0, // 起始点y坐标
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    // 初始化画板
    init () {
      let canvas = this.$refs.canvas;
      this.ctx = canvas.getContext('2d');
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 5;
      this.stage_info = canvas.getBoundingClientRect();
    },
    // mobile
    touchStart (ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length === 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.points.push(obj);
      }
    },
    touchMove (ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length === 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        };
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.startX = obj.x;
        this.startY = obj.y;
        this.points.push(obj);
      }
    },
    touchEnd (ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length === 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.points.push(obj);
      }
    },
    // 提交签名
    commit () {
      this.canvasImg = this.$refs.canvas.toDataURL(); // 签名img
    }
  }
};
</script>

<style lang="scss" scoped>
.signature {
  min-height: 100vh;
  background: #fff;
  position: relative;
  .canvas {
    font-size: 0;
  }

  .btn {
    position: absolute;
    bottom: 1rem;
    width: 7rem;
    height: 3.2rem;
    border: none;
    line-height: 2.4rem;
    text-align: center;
    padding: 0 1rem;
    background: #FC3B40;
    border-radius: 0.2rem;
    font-size: 1.2rem;
    color: #FFF;
  }

  .reset {
    left: 1rem;
  }

  .commit {
    right: 1rem;
  }
}
</style>

<template>
  <div class="container">
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div>

    <div class="cut">
      <vue-cropper
        class="cro-box"
        style="background: none;"
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :fixed-box="option.fixedBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :auto-crop-width="option.autoCropWidth"
        :auto-crop-height="option.autoCropHeight"
        :center-box="option.centerBox"
        @real-time="realTime"
        :high="option.high"
        @img-load="imgLoad">
      </vue-cropper>
    </div>
    <div class="test-button">
      <button @click="finish('base64')" class="btn">预览(base64)</button>
      <label class="btn" for="uploads">upload</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)">
    </div>

    <div style="width: 100%; height: 50px;"></div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'test',
  data() {
    return {
      items: [],
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},

      option: {
        img:'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG',
        //img: '',//裁剪图片的地址
        size: 1,
        full: false, //是否输出原图比例的截图
        outputType: 'png',//裁剪生成图片的格式
        canMove: true, //上传图片是否可以移动
        fixedBox: true, //固定截图框大小 不允许改变
        original: false, //上传图片按照原始比例渲染
        canMoveBox: true, //截图框能否拖动
        autoCrop: true, //  是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300, //默认生成截图框宽度
        autoCropHeight: 168, //默认生成截图框高度
        centerBox: false, //截图框是否被限制在图片里面
        high: true,  //是否按照设备的dpr 输出等比例图片
        // canScale: true
      },
      show: true
    }
  },

  methods: {
    // 截图
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          console.log(data);
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
            // data就是截到图片生成的base64
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },


    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }

      console.log(file, 'aaaaaaaaaa')

      var reader = new FileReader();
      reader.onload = (e) => {
        let data;

        console.log(e)
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));

          console.log(data);
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      console.log(msg)
    },
  }
}
</script>

<style lang="scss" scoped>
.cut {
  width: 100%;
  height: 500px;
  margin: 30px auto;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin:20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all .2s ease;
  text-decoration: none;
  user-select: none;
}

.des {
  line-height: 30px;
}

.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%)
  ,linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}

</style>

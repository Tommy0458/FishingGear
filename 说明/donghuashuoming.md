一、前言
日常开发中，一些动画交互效果通过 CSS 是不好实现的，这时候常见的做法可能就是使用 gif 动图去实现，但当动画复杂并想要保证清晰度以及流畅度时，图片的体积就可能过大，并不一定能达到我们理想的效果。
这时候我们可以用 lottie 动画库去调用 UI 设计师通过相应平台导出的 json 文件，进行动画的加载。
本文以 uniapp 的微信小程序为例，采用微信小程序官方文档推荐的 lottie-miniprogram 进行简单的使用介绍。
主要是说下在实际运用中普遍都会遇到一些坑怎么解决，最后将其封装成一个组件调用。
开发环境

















环境版本node20.13.1npm10.5.2
主要依赖包





















依赖包版本@dcloudio/uni-app3.0.0-4030620241128001vue3.4.21lottie-miniprogram1.0.12
二、核心流程
1、通过 npm 安装
bash 代码解读复制代码npm install --save lottie-miniprogram

2、传入 canvas 对象用于适配
html 代码解读复制代码<canvas id="lottieCanvas" type="2d"></canvas>

js 代码解读复制代码import lottie from "lottie-miniprogram";
import { getCurrentInstance, onMounted, ... } from "vue";

onMounted(() => {
  uni
    .createSelectorQuery()
    .in(getCurrentInstance().proxy)
    .select("#lottieCanvas")
    .node((res) => {
      const canvas = res.node;
      lottie.setup(canvas);
      ...
    })
    .exec();
});

3、使用 lottie 接口
js 代码解读复制代码...
lottie.setup(canvas);
state.animation = lottie.loadAnimation({
  loop: true, // 默认值为 true。true 无限循环、传入 number 值循环指定次数
  autoplay: true, // 默认值为 true。true 动画加载完后自动播放
  rendererSettings: {
    context: canvas.getContext("2d") // 必填，需传入渲染使用的 canvas 上下文对象
  },
  // 必填，animationData 和 path 二选一
  animationData: ..., // 加载动画的 json 对象
  path: ... // 加载动画的线上 url 的 json 文件（只支持网络地址）
});

// 页面退出时需销毁组件
state.animation.destroy();
...


lottie-miniprogram 的 github 仓库说明

本项目是以 npm 的方式依赖原 lottie-web 项目，若原项目有新版本，可直接改变依赖的版本号。
本项目依赖小程序基础库 2.8.0 里性能更好的 canvas 实现，由于还有些小问题没有正式开放（2.9.0 已正式对外），但目前用在此处暂无发现问题。
由于小程序本身不支持动态执行脚本，因此 lottie 的 expression 功能也是不支持的。


三、存在问题
在实际使用的场景中，会遇到一些常见问题，这里简单进行下分析，所有代码都会整合到最后的案例里面。
1、绘制动画比例有误、图形模糊
最常见的场景就是 UI 设计师提供动画 json 文件给我们时会说导出的尺寸是多少 px，当我们按照官方 github 仓库提供的案例去进行相应配置使用时总感觉动画显得模糊，特别是在真机上调试的时候。
这是因为 canvas 是根据 px 进行绘制的，但是在我们真机上每一个 px 逻辑像素实际上对应着多个物理像素，不同手机型号存在着不同的 dpr（Device Pixel Ratio，设备像素比）。简单来说就是我们用 canvas 绘制 100px * 100px 的盒子，在手机上可能被放大了几倍去渲染，所以就显得模糊了。
解决思路：

canvas 支持的单位是 px，我们需要将小程序内使用的 rpx 单位转换为 px，这样绘制图形在各屏幕占比才准确。
给 canvas 通过 css 和 js 进行一样的宽高设置。
调用 canvas.getContext("2d").scale(dpr, dpr) 将 canvas 绘制上下文进行相应倍数的放大。
这时候我们用 canvas 放大倍数绘制的内容去到真机上展示就是清晰的。

2、通过 CSS 更改位置无效
有时候我们通过 canvas 绘制了一个动画，想要对其进行位置的调整，却发现 css 代码不生效。
这是因为在微信小程序中 canvas 是原生组件，渲染层级由客户端（如 ios/android 微信客户端）直接控制，层架高于普通的 webview 组件，不受 webview 的 css 引擎控制，所以无法通过 css 样式进行覆盖。
我们只能在其创建的时候就指定好位置，或者通过 js 的 api 去获取节点再设置位置。
3、兼容性
在使用的过程中，碰到了一个现象。UI 设计师通过 ae 导出的一个 json 文件提供到我这边，涉及的一部分渐变交互动画在页面中加载出来是静止不动的。
这个 json 文件导入 ae 看效果是能够正常加载交互，但放入代码中以及 lottie 官网的编辑器就是展示不出来那部分渐变交互动画。
怀疑是 ae 在导出时的某些设置导致的兼容性问题，前端这边暂时定位不到。
四、组件封装
我这边主要的需求就是:

支持通过小程序的 rpx 单位进行宽高的设置。
通过 json 对象设置动画内容。
动画正常加载，可以控制显示和隐藏。

采用的技术栈是 uniapp + vue3 + ts，有需要的小伙伴可以自行改成原生微信小程序或 taro 的写法，对其中的一些 api 进行替换就行，大体是一致的。

封装组件 LottieAnimation

html 代码解读复制代码<template>
  <div
    v-if="props.isShow"
    class="lottie-container"
    :style="{
      width: `${props.width}rpx`,
      height: `${props.height}rpx`,
    }"
  >
    <canvas
      id="lottieCanvas"
      type="2d"
      :style="{
        width: `${props.width}rpx`,
        height: `${props.height}rpx`,
      }"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import lottie from "lottie-miniprogram";
import { getCurrentInstance, onMounted, onUnmounted, reactive } from "vue";

const props = withDefaults(
  defineProps<{
    isShow: boolean;
    /** 本地 json 对象或者线上 url 的 json 文件 */
    json: Record<string, any> | string;
    /** 单位 rpx */
    width: number;
    /** 单位 rpx */
    height: number;
  }>(),
  {}
);

const state = reactive({
  animation: null as ReturnType<typeof lottie.loadAnimation> | null,
});

const actions = {
  rpxToPx(rpx: number) {
    return (rpx / 750) * uni.getWindowInfo().windowWidth;
  },
};

onMounted(() => {
  try {
    const instance = getCurrentInstance();
    if (!instance) return console.error("动画加载，无法获取当前组件实例");
    uni
      .createSelectorQuery()
      .in(instance.proxy)
      .select("#lottieCanvas")
      .node((res) => {
        const canvas = res.node;

        // 倍数调整，保证展示效果清晰度
        const ctx = canvas.getContext("2d");
        const dpr = uni.getSystemInfoSync().pixelRatio;
        canvas.width = actions.rpxToPx(props.width) * dpr;
        canvas.height = actions.rpxToPx(props.height) * dpr;
        ctx.scale(dpr, dpr);

        const options: Parameters<typeof lottie.loadAnimation>[0] = {
          loop: true,
          autoplay: true,
          rendererSettings: {
            context: ctx,
          },
        };
        if (typeof props.json === "string") {
          options.path = props.json;
        } else {
          options.animationData = props.json;
        }

        lottie.setup(canvas);
        state.animation = lottie.loadAnimation(options);
      })
      .exec(() => {
        state.animation?.play();
      });
  } catch (error) {
    console.error("动画加载出错啦");
  }
});

onUnmounted(() => {
  state.animation?.destroy();
});
</script>

<style>
.lottie-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


页面调用组件

html 代码解读复制代码<template>
  <div class="container">
    <LottieAnimation :isShow="true" :json="data" :width="200" :height="200" />
  </div>
</template>

<script setup lang="ts">
import LottieAnimation from "@/components/LottieAnimation/LottieAnimation.vue";
import data from "@/components/LottieAnimation/json/data.json";
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  box-sizing: border-box;
  padding-bottom: 200rpx;
}
</style>



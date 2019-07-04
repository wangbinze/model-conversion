<template>
  <div class="home">
    <img alt="model" src="../assets/ModelPicture.png">
    <Hello-world msg="3D模型，改变您的世界！"/>
    进一步理解空间，发掘更大价值
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div class="starter-page">
    <!--<div class="section text-center">
      <h3>网站内容</h3>
    </div>-->
  </div>
</template>
<script>
  import * as THREE from 'three';
  import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls'
  // import {MTLLoader} from  'three/examples/jsm/loaders/MTLLoader'
  // import {OBJLoader} from  'three/examples/jsm/loaders/OBJLoader'
  import {GLTFLoader} from  'three/examples/jsm/loaders/GLTFLoader'
  import {DRACOLoader} from  'three/examples/jsm/loaders/DRACOLoader'

export default {
  name: 'starter',
};
</script>
<style>
.starter-page {
  /*min-height: calc(100vh - 95px);*/
  min-height: calc(100vh);
  background-color: #333333;
}
</style>

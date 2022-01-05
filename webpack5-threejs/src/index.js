import "./style.css";

import * as THREE from "three";

function init() {
  console.log("using Three.js version: " + THREE.REVISION);

  // 创建场景
  const scene = new THREE.Scene();
  // 创建相机 视场，宽高比，近面，远面
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 渲染器，还有其他种类的渲染器
  const renderer = new THREE.WebGL1Renderer();
  // 设置背景色
  renderer.setClearColor(new THREE.Color(0x000000));
  // 设置渲染范围
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 默认情况下不会渲染阴影，渲染阴影会消耗大量资源
  renderer.shadowMap.enabled = true;

  // 设置轴粗细为20像素
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // 创建平面
  const planeGeometry = new THREE.PlaneGeometry(60, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  // 设置为接收阴影
  plane.receiveShadow = true;
  // 场景中添加平面
  scene.add(plane);

  // 创建盒子
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-4, 3, 0);
  // 设置投射阴影
  cube.castShadow = true;
  scene.add(cube);

  // 球体
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(20, 4, 2);
  // 设置投射阴影
  sphere.castShadow = true;
  scene.add(sphere);
  // 设置相机位置
  camera.position.set(-30, 40, 30);
  // 设置相机方向
  camera.lookAt(scene.position);

  // 添加光源
  // 定义点光源
  const spotLight = new THREE.SpotLight(0xffffff);
  // 设置位置
  spotLight.position.set(-40, 40, -15);
  // 设置由点光源投射阴影
  spotLight.castShadow = true;
  // todo 设置阴影的精细程度
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;

  scene.add(spotLight);

  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

init();

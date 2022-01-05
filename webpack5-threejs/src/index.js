import "./style.css";

import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import * as dat from "../libs/util/dat.gui";

function init() {
  console.log("using Three.js version: " + THREE.REVISION);

  const stats = initStats();

  // 创建场景
  const scene = new THREE.Scene();

  // 渲染器，还有其他种类的渲染器
  const renderer = new THREE.WebGL1Renderer();
  // 设置背景色
  renderer.setClearColor(new THREE.Color(0x000000));
  // 设置渲染范围
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 默认情况下不会渲染阴影，渲染阴影会消耗大量资源
  renderer.shadowMap.enabled = true;

  // 创建相机 视场，宽高比，近面，远面
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(-30, 40, 30);
  // 设置相机方向
  camera.lookAt(scene.position);

  createAxes(scene);
  createPlane(scene);
  const cube = createCube(scene);
  const sphere = createSphere(scene);
  createSpotLight(scene);

  // 增加GUI操作界面
  const controls = new (function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
  })();
  const gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);

  document.body.appendChild(renderer.domElement);

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  let step = 0;
  renderScene();

  function renderScene() {
    trackballControls.update(clock.getDelta());

    // 更新统计
    stats.update();
    // 旋转立方体
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", onResize, false);
  function onResize() {
    // 重设宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // todo 更新矩阵？
    camera.updateProjectionMatrix();
    // 重设大小
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

function initStats(type) {
  const panelType =
    typeof type !== "undefined" && type && !isNaN(type) ? parseInt(type) : 0;
  const stats = new Stats();

  stats.showPanel(panelType);
  document.body.appendChild(stats.dom);
  return stats;
}

init();

/**
 * 创建平面
 * @param scene
 */
function createPlane(scene) {
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
}

function createAxes(scene) {
  // 设置轴粗细为20像素
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
}

/**
 * 创建立方体
 * @param scene
 * @returns {Mesh}
 */
function createCube(scene) {
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-4, 3, 0);
  // 设置投射阴影
  cube.castShadow = true;
  scene.add(cube);

  return cube;
}

/**
 * 创建球体
 * @param scene
 */
function createSphere(scene) {
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

  return sphere;
}

/**
 * 创建点光源
 * @param scene
 */
function createSpotLight(scene) {
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
}

/**
 * Initialize trackball controls to control the scene
 *
 * @param {THREE.Camera} camera
 * @param {THREE.Renderer} renderer
 */
function initTrackballControls(camera, renderer) {
  var trackballControls = new TrackballControls(camera, renderer.domElement);

  trackballControls.rotateSpeed = 10.0;
  trackballControls.zoomSpeed = 1.2;
  trackballControls.panSpeed = 0.8;
  trackballControls.noZoom = false;
  trackballControls.noPan = false;
  trackballControls.staticMoving = true;
  trackballControls.dynamicDampingFactor = 0.3;
  trackballControls.keys = [65, 83, 68];

  return trackballControls;
}

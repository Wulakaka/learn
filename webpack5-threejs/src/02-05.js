import "./style.css";

import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import * as dat from "../libs/util/dat.gui";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

function init() {
  const stats = initStats();

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

  // 设置相机位置
  camera.position.set(-20, 25, 20);
  // 设置相机方向
  camera.lookAt(new THREE.Vector3(5, 0, 0));
  createAmbientLight(scene);

  const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  const plane = createPlane(scene, planeGeometry);
  const customMesh = createCustomMesh(scene);

  createSpotLight(scene, customMesh);
  // 增加GUI操作界面

  function addControl(x, y, z) {
    return new (function () {
      this.x = x;
      this.y = y;
      this.z = z;
    })();
  }

  const controlPoints = [];
  controlPoints.push(addControl(3, 5, 3));
  controlPoints.push(addControl(3, 5, 0));
  controlPoints.push(addControl(3, 0, 3));
  controlPoints.push(addControl(3, 0, 0));
  controlPoints.push(addControl(0, 5, 0));
  controlPoints.push(addControl(0, 5, 3));
  controlPoints.push(addControl(0, 0, 0));
  controlPoints.push(addControl(0, 0, 3));

  const gui = new dat.GUI();

  for (let i = 0; i < 8; i++) {
    const f1 = gui.addFolder("Vertices" + (i + 1));
    f1.add(controlPoints[i], "x", -10, 10);
    f1.add(controlPoints[i], "y", -10, 10);
    f1.add(controlPoints[i], "z", -10, 10);
  }

  document.body.appendChild(renderer.domElement);

  const trackballControls = initTrackballControls(camera, renderer);
  const clock = new THREE.Clock();

  let step = 0;
  renderScene();

  function renderScene() {
    trackballControls.update(clock.getDelta());

    // 更新统计
    stats.update();

    const vertices = [];
    for (let i = 0; i < 8; i++) {
      vertices.push(controlPoints[i].x, controlPoints[i].y, controlPoints[i].z);
    }

    customMesh.children.forEach(function ({ geometry }) {
      // e.getAttribute("array");
      console.log(geometry.attributes);
      // geometry.setAttribute(
      //   "position",
      //   new THREE.BufferAttribute(new Float32Array(vertices), 3)
      // );
    });

    customMesh.children.forEach(function (e) {});
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
 * @param planeGeometry
 * @returns {Mesh}
 */
function createPlane(scene, planeGeometry) {
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, 0, 0);
  // 设置为接收阴影
  plane.receiveShadow = true;
  // 场景中添加平面
  scene.add(plane);

  return plane;
}

/**
 * 创建聚光灯光源
 * @param scene
 * @param mesh
 */
function createSpotLight(scene, mesh) {
  // 定义聚光灯光源
  const spotLight = new THREE.SpotLight(0xffffff, 1, 180, Math.PI / 4);
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.mapSize.width = 2048;
  // 设置位置
  spotLight.position.set(-40, 30, 30);
  // 设置由聚光灯光源投射阴影
  spotLight.castShadow = true;
  spotLight.lookAt(mesh);
  scene.add(spotLight);
}

function createAmbientLight(scene) {
  const ambientLight = new THREE.AmbientLight(0x494949);
  scene.add(ambientLight);
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

function createCustomMesh(scene) {
  // 指定顶点
  const verticesOfCube = [
    1, 2, 1, 1, 2, -1, 1, -2, 1, 1, -2, -1, -1, 2, -1, -1, 2, 1, -1, -2, -1, -1,
    -2, 1,
  ];

  // 指定三角形面，顺时针是面向摄像机，逆时针是背对摄像机
  const indicesOfFaces = [
    0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 4, 5, 1, 5, 0, 1, 7, 6, 2, 6, 3, 2, 5,
    7, 0, 7, 2, 0, 1, 3, 4, 3, 6, 4,
  ];

  const geometry = new THREE.PolyhedronGeometry(
    verticesOfCube,
    indicesOfFaces,
    10,
    0
  );
  const materials = [
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    }),
    new THREE.MeshLambertMaterial({
      opacity: 0.6,
      color: 0x44ff44,
      transparent: true,
    }),
  ];
  const mesh = createMultiMaterialObject(geometry, materials);
  mesh.castShadow = true;
  mesh.children.forEach(function (e) {
    e.castShadow = true;
  });
  mesh.position.y = 10;
  mesh.position.x = 10;
  scene.add(mesh);
  return mesh;
}

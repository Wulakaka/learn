import './style.css'

import * as THREE from 'three';

function init() {
    console.log('using Three.js version: ' + THREE.REVISION)

    // 创建场景
    const scene = new THREE.Scene()
    // 创建相机 视场，宽高比，近面，远面
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    // 渲染器，还有其他种类的渲染器
    const renderer = new THREE.WebGL1Renderer()
    // 设置背景色
    renderer.setClearColor(new THREE.Color(0x000000))
    // 设置渲染范围
    renderer.setSize(window.innerWidth, window.innerHeight)

    // 设置轴粗细为20像素
    const axes = new THREE.AxesHelper(20)
    scene.add(axes)

    const planeGeometry = new THREE.PlaneGeometry(60, 20)
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xAAAAAA
    })

    // 创建平面
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.set(15, 0, 0)
    // 场景中添加平面
    scene.add(plane)

    // 创建盒子
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        wireframe: true
    })

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(-4, 3, 0)
    scene.add(cube)

    const sphereGeometry = new THREE.SphereGeometry(4,20,20)
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777FF,
        wireframe: true
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(20,4,2)
    scene.add(sphere)
    // 设置相机位置
    camera.position.set(-30, 40, 30)
    // 设置相机方向
    camera.lookAt(scene.position)

    document.body.appendChild(renderer.domElement)
    renderer.render(scene, camera)
}

init()

import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';



export default class ThreeEngine {
  constructor(init_size) {
    this.time = 0;
    this.rot = 0;

    const body = document.querySelector('body');
    const width = Math.min(body.clientWidth, body.clientHeight);
    const height = width * 0.8;

    const canvasElement = document.querySelector('#myCanvas');

    // レンダラ作成
    this.render = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
    });
    this.render.setPixelRatio(window.devicePixelRatio);
    this.render.setSize(width, height);

    // シーン作成
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x666666);
    const gridHelper = new THREE.GridHelper(128, 128);
    this.scene.add(gridHelper);

    // カメラ作成
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e3);

    this.camera.position.set(0, init_size * 1.28, 0);
    // this.camera.rotation.x = -(90 * Math.PI / 180);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // カメラコントローラーを作成
    this.controls = new OrbitControls(this.camera, canvasElement);
    // 滑らかにカメラコントローラーを制御する
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;
    // this.controls.target.y = init_size * 0.5;
    // console.log(this.controls);
    // this.controls.target.z = -(90 * (Math.PI / 180));

    // this.camera.rotation.z = -(90 * (Math.PI / 180));

    console.log(this.controls);
    this.geometry = new THREE.PlaneGeometry(init_size, init_size, 1, 1);

    this.material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -(90* (Math.PI / 180)) ;
    // this.mesh.position.y = init_size * 0.5;
    this.scene.add(this.mesh);
    this.tick = this.tick.bind(this);
  }

  run(main) {
    requestAnimationFrame(main.tick);
    // this.tick();
    // this.tick = this.tick.bind(this);
  }

  tick() {
    this.controls.update();
    this.time++;
    this.render.render(this.scene, this.camera);
    requestAnimationFrame(this.tick);
  }


}


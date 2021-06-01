// 最新version でやる気持ち
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { TDSLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/TDSLoader.js';

import { ColladaLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/ColladaLoader.js';


window.addEventListener('load', init);

function init() {
  // 画面サイズ
  const width = document.querySelector('body').clientWidth;
  const height = width * 1.5;
  let rot = 0;
  
  // レンダラ作成
  const canvasElement = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e4);
  camera.position.set(0, 16, 16);
  //camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  
  
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 0.8, 1e4);
  //pointLight.position.set(1, 1, 1);
  scene.add(pointLight);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);
  
  
  
  // .dae 呼び出し
  // 3DS形式のモデルデータを読み込む
  const loader = new ColladaLoader();
  // 3dsファイルのパスを指定
  loader.load('../models/collada/elf/elf.dae', (collada) => {
    // 読み込み後に3D空間に追加
    const model = collada.scene;
    scene.add(model);
  });
  
  
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(64, 64), 
    new THREE.MeshStandardMaterial(
      {
        color: 0x6699ff,
        roughness:0.5,
        //emissive: 0x072534,
        side: THREE.FrontSide,
        //flatShading: true,
      })
  );
  ground.rotation.x = Math.PI / -2;
  scene.add(ground);
  
  
  const lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);
 
  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);
  /*
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);
  */
  tick();
  // 毎フレーム時に実行されるループイベント
  function tick() {
    controls.update();
    
    pointLight.position.set(
      500 * Math.sin(Date.now() / 512),
      500 * Math.sin(Date.now() / 1024),
      500 * Math.cos(Date.now() / 512)
    );
    
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

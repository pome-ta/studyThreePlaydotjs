// 最新version でやる気持ち
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { TDSLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/TDSLoader.js';


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
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e4);
  camera.position.set(0, 0, +5);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  
  
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
  
  // .obj 呼び出し
  // 3DS形式のモデルデータを読み込む
  const loader = new TDSLoader();
  // テクスチャーのパスを指定
  loader.setResourcePath('../models/3ds/portalgun/textures/');
  // 3dsファイルのパスを指定
  loader.load('../models/3ds/portalgun/portalgun.3ds', (object) => {
    // 読み込み後に3D空間に追加
    scene.add(object);
  });
  
  tick();
  // 毎フレーム時に実行されるループイベント
  function tick() {
    controls.update();
    
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

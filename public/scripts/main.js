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
  // レンダラー：シャドウを有効にする
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x444444);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e4);
  camera.position.set(32, 32, 32);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  
  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  // 影を受け付ける
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);
  
  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  // 影を落とす
  meshKnot.castShadow = true;
  scene.add(meshKnot);
  
  
  // 照明を作成
  const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);
  // ライトに影を有効にする
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);
 

  tick();
  // 毎フレーム時に実行されるループイベント
  function tick() {
    controls.update();
    
  // 照明の位置を更新
  const t = Date.now() / 500;
  const r = 20.0;
  const lx = r * Math.cos(t);
  const lz = r * Math.sin(t);
  const ly = 20.0 + 5.0 * Math.sin(t / 3.0);
  light.position.set(lx, ly, lz);
    
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

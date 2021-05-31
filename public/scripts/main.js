// 最新version でやる気持ち
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';



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
  camera.position.set(0, 0, +2048);
  
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 形状とマテリアルからメッシュを作成します
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(300, 300, 300), new THREE.MeshNormalMaterial());
  scene.add(mesh);
  
  
  // 星屑を作成 (カメラの動きをわかりやすくするため)
  createStarField();

  /** 星屑を作成 */
  function createStarField() {
    // 頂点情報を作成
    const vertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = 3000 * (Math.random() - 0.5);
      const y = 3000 * (Math.random() - 0.5);
      const z = 3000 * (Math.random() - 0.5);
      vertices.push(x, y, z);
    }
    
    // 形状データを作成
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
  
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 4,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
    });
  
    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }

  
  

  
  tick();
  // 毎フレーム時に実行されるループイベント
  function tick() {
    controls.update();
    
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

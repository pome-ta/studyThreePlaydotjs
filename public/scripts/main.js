// 最新version でやる気持ち
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}
// xxx: 読み込み時に作るあとで
const btnEle = document.querySelector('#btn');


window.addEventListener('load', init);


function init() {
  // 画面サイズ
  const width = document.querySelector('body').clientWidth;
  const height = width * 0.64;
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
  camera.position.set(0, 0, 128);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // ポジションリセット
  btnEle.addEventListener(tapStart, () => {
    camera.position.set(0, 0, 128);
    //console.log(canvasElement);
  });
  
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  
  
  const geometry = new THREE.PlaneGeometry(64, 64, 16, 16);
  const material = new THREE.MeshNormalMaterial();
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  
  
  
  // 毎フレーム時に実行されるループイベント
  tick();
  function tick() {
    controls.update();
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

import * as THREE from 'https://unpkg.com/three/build/three.module.js';



window.addEventListener('load', init);

function init() {
  const width = document.querySelector('body').clientWidth;
  const height = width;
  
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  
  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);

  // 箱を作成
  const geometry = new THREE.BoxGeometry(400, 400, 400);
  const material = new THREE.MeshNormalMaterial();
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);
  
  tick();
  
  // 毎フレーム時に実行されるループイベント
  function tick() {
    box.rotation.x += 0.02;
    box.rotation.y += 0.05;
    box.rotation.z += 0.06;
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

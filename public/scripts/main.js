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
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e4);
  camera.position.set(0, 0, +1024);
  
  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // 画像読み込み
  const loader = new THREE.TextureLoader();
  const texture = loader.load('../imgs/earthmap1k.jpg');
  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({
    map: texture
  });
  //const material = new THREE.MeshStandardMaterial({color: 0xFF0000});
  //const material = new THREE.MeshNormalMaterial();
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(mesh);
  
  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);
  
  tick();
  
  // 毎フレーム時に実行されるループイベント
  function tick() {
    requestAnimationFrame(tick);
    mesh.rotation.y += 0.01;
    // レンダリング
    renderer.render(scene, camera);
  }
  
}



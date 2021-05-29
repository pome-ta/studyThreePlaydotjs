import * as THREE from 'https://unpkg.com/three/build/three.module.js';



window.addEventListener('load', init);

function init() {
  // 画面サイズ
  const width = document.querySelector('body').clientWidth;
  const height = width;
  let rot = 0;
  
  // レンダラ作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e4);
  camera.position.set(0, 512, +1024);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  

  tick();
  // 毎フレーム時に実行されるループイベント
    renderer.render(scene, camera);
    
    requestAnimationFrame(tick);
  }
  
}

import * as THREE from 'https://unpkg.com/three/build/three.module.js';



window.addEventListener('load', init);

function init() {
  const width = document.querySelector('body').clientWidth;
  const height = width;
  let rot = 0;
  
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  

  tick();
  // 毎フレーム時に実行されるループイベント
    renderer.render(scene, camera);
    
    requestAnimationFrame(tick);
  }
  
}

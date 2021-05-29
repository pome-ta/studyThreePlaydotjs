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
  camera.position.set(0, 512, +1024);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  // コンテナーを作成
  const container = new THREE.Object3D();
  scene.add(container);
  
  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    side: THREE.FrontSide,
    roughness: 0.0,
    //wireframe: true
  });
  
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を作成
  const ambientLight = new THREE.AmbientLight(0x999999);
  scene.add(ambientLight);
  
  // ジオメトリを作成
  const geometryList = [
    new THREE.SphereGeometry(50), // 球体
    new THREE.BoxGeometry(100, 100, 100), // 直方体
    new THREE.PlaneGeometry(100, 100), // 平面
    new THREE.TetrahedronGeometry(100, 0), // カプセル形状
    new THREE.ConeGeometry(100, 100, 32), // 三角錐
    new THREE.CylinderGeometry(50, 50, 100, 32), // 円柱
    new THREE.TorusGeometry(50, 30, 16, 100), // ドーナツ形状
  ];
  
  geometryList.map((geometry, index) => {
    // 形状とマテリアルからメッシュを作成します
    const mesh = new THREE.Mesh(geometry, material);
  
    // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
    container.add(mesh);
  
    // 円周上に配置
    mesh.position.x = 400 * Math.sin((index / geometryList.length) * Math.PI * 2);
    mesh.position.z = 400 * Math.cos((index / geometryList.length) * Math.PI * 2);
  });
  

  tick();
  // 毎フレーム時に実行されるループイベント
  function tick() {
    for (const obj of container.children) {
      obj.rotation.x -= 0.01;
      obj.rotation.y += 0.02;
      obj.rotation.z += 0.01;
    }
    container.rotation.y += 0.01;
    // レンダリング
    renderer.render(scene, camera);
    
    requestAnimationFrame(tick);
  }
  
}

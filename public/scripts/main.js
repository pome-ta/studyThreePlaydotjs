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
  //camera.position.set(0, 512, +1024);
  
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('../imgs/earthmap1k.jpg'),
    side: THREE.DoubleSide,
  });
  
  // 球体の形状を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // 形状とマテリアルからメッシュを作成
  const earthMesh = new THREE.Mesh(geometry, material);
  // シーンにメッシュを追加
  scene.add(earthMesh);
  
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
      size: 2,
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
    rot += 0.5; // 毎フレーム角度を0.5度ずつ加算
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 1024 * Math.sin(radian);
    camera.position.z = 1024 * Math.cos(radian);
    //earthMesh.rotation.y -= 0.01;
    
    
    
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

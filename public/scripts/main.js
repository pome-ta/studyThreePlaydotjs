// 最新version でやる気持ち
import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

// モバイルとpc の差異
const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}


// xxx: 読み込み時に作るあとで
const btnEle = document.querySelector('#btn');
window.addEventListener('load', init);


let vertexSource = `
precision mediump float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 color;
attribute vec3 displacement;
varying vec3 vColor;
 
void main(){
  vColor = color;
  vec3 vv = position + displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vv,1.0);
}
`;

let fragmentSource = document.querySelector('#ed').value;
//console.log(fragmentSource);
/*
let fragmentSource = `
precision mediump float;
uniform float time;

//vUvを取得
varying vec2 vUv;

void main(){

  //uv座標系で、オブジェクトの中心に原点を設定
  vec2 p = vUv;//(vUv * 2.0 - 1.0);
 
  gl_FragColor = vec4(p.x, p.y, abs(sin(time* 0.01)), 1.0);
}
`;

*/





function init() {
  // 画面サイズ
  const width = document.querySelector('body').clientWidth;
  const height = width * 0.8;
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
  
  // 座標軸を表示
  const axes = new THREE.AxisHelper(8);
  scene.add(axes);
  
  
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e3);
  //cam_set(camera);
  camera.position.set(0, 0, 16);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // ポジションリセット
  //console.log(camera);
  
  
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御する
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  
  
  const gridHelper = new THREE.GridHelper(128, 128);
  scene.add(gridHelper);
  //renderer.outputEncoding = THREE.sRGBEncoding;
  
  
  //const geometry = new THREE.PlaneGeometry(128, 64, 1, 1);
  
  //timeを設定
  const uniforms = {
    time: { type:'f', value: 0.0 }
  };
  const positions = new Float32Array([
     2.5,  0.0,  0.0,
     0.0,  5.0,  0.0,
    -2.5,  0.0,  0.0,
  ]);
    const colors = new Float32Array([
    1.0,0.0,0.0,
    0.0,0.0,1.0,
    0.0,1.0,0.0,
  ]);
  const displacement = new Float32Array(3 * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));
  
  
  const material = new THREE.RawShaderMaterial({
    vertexShader:vertexSource,
    fragmentShader:fragmentSource,
    uniforms:uniforms,
    side:THREE.DoubleSide,
  });
  const triangle = new THREE.Mesh(geometry, material);
  scene.add(triangle);
    
    
    
 
  
  
  /*
  const material = new THREE.RawShaderMaterial({
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
    uniforms: uniforms,
    side: THREE.FrontSide,
    //wireframe: true
  });
  
  //const material = new THREE.MeshNormalMaterial();
  
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  */
  
  
  btnEle.addEventListener(tapStart, () => {
    camera.position.set(0, 0, 16);
    //cam_set(camera);
    material.fragmentShader = document.querySelector('#ed').value;
    triangle.material = material;
    material.needsUpdate = true;
  });
  
  
  
  
  // 毎フレーム時に実行されるループイベント
  let time = 0;
  tick();
  function tick() {
    controls.update();
    
    /*
    if (mesh.material.fragmentShader === document.querySelector('#ed').value) {
      console.log('きてる');
    } else {
      mesh.material.fragmentShader = document.querySelector('#ed').value;
      material.needsUpdate = true;
    }*/
    
    // レンダリング
    time ++;
    uniforms.time.value = time;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

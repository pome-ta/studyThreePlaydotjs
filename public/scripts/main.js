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


let vertexSource = `
//精度の指定を追加
precision mediump float;

//positionの宣言
attribute vec3 position;
 
//uvの宣言
attribute vec2 uv;
 
//projectionMatrixの宣言
uniform mat4 projectionMatrix;
 
//modelViewMatrixの宣言
uniform mat4 modelViewMatrix;

varying vec2 vUv;

void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

  //フラグメントシェーダにuvを転送
  vUv = uv;
}
`;


let fragmentSource = `
precision mediump float;
uniform float time;

//vUvを取得
varying vec2 vUv;

void main(){

  //uv座標系で、オブジェクトの中心に原点を設定
  vec2 p = vUv;//(vUv * 2.0 - 1.0);
 
  gl_FragColor = vec4(p.x,p.y,abs(sin(time* 0.01)),1.0);
}
`;







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
  
  
  const geometry = new THREE.PlaneGeometry(64, 64, 4, 4);
  //timeを設定
  const uniforms = {
    time:{type:'f',value:0.0}
  };
  
  
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
  
  
  
  
  // 毎フレーム時に実行されるループイベント
  let time = 0;
  tick();
  function tick() {
    controls.update();
    // レンダリング
    time ++;
    mesh.material.uniforms.time.value = time;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  
}

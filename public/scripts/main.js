import ThreeEngine from './threeEngine.js';


const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}

const init_size = 16;
const engine = new ThreeEngine(init_size);

function onReSize() {
  const body = document.querySelector('body');
  const width = Math.min(body.clientWidth, body.clientHeight);
  const height = width * 0.8;
  engine.render.setPixelRatio(window.devicePixelRatio);
  engine.render.setSize(width, height);
  engine.camera.aspect = width / height;
  engine.camera.updateProjectionMatrix();
}



window.addEventListener('load', engine.run(engine));
window.addEventListener('resize', onReSize);



const btn = document.querySelector('#btn');
btn.addEventListener(tapStart, () => {
  engine.camera.position.set(0, init_size * 1.28, 0);
});




// // 最新version でやる気持ち
// import * as THREE from 'https://cdn.skypack.dev/three';
// import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

// // モバイルとpc の差異
// const {tapStart, tapMove, tapEnd} = {
//   tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
//   tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
//   tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
// }


// // xxx: 読み込み時に作るあとで
// const btnEle = document.querySelector('#btn');
// window.addEventListener('load', init);


// let vertexSource = `
// precision mediump float;

// attribute vec3 position;
// attribute vec3 color;
// attribute vec3 displacement;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;

// varying vec3 vColor;

// void main(){
//   vColor = color;
//   vec3 vv = position + displacement;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(vv,1.0);
// }
// `;

// let fragmentSource = document.querySelector('#ed').value;
// //console.log(fragmentSource);
// /*
// let fragmentSource = `
// precision mediump float;
// uniform float time;

// //vUvを取得
// varying vec2 vUv;

// void main(){

//   //uv座標系で、オブジェクトの中心に原点を設定
//   vec2 p = vUv;//(vUv * 2.0 - 1.0);

//   gl_FragColor = vec4(p.x, p.y, abs(sin(time* 0.01)), 1.0);
// }
// `;

// */



// function onResize() {
//   const body = document.querySelector('body');
//   const width = body.clientWidth;
//   const height = width * 0.8;
//   return { width: width, height:height };
// }

// function init() {
//   // 画面サイズ
//   const width = document.querySelector('body').clientWidth;
//   const height = width * 0.8;
//   let rot = 0;

//   const cSize = 16;

//   // レンダラ作成
//   const canvasElement = document.querySelector('#myCanvas');
//   const renderer = new THREE.WebGLRenderer({
//     canvas: canvasElement,
//     antialias: true,
//   });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(width, height);

//   // シーンを作成
//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x666666);

//   const gridHelper = new THREE.GridHelper(128, 128);
//   scene.add(gridHelper);
//   //renderer.outputEncoding = THREE.sRGBEncoding;


//   // カメラを作成
//   const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e3);
//   camera.position.set(0, cSize * 0.5, cSize*1.28);
//   camera.lookAt(new THREE.Vector3(0, 0, 0));


//   // カメラコントローラーを作成
//   const controls = new OrbitControls(camera, canvasElement);
//   // 滑らかにカメラコントローラーを制御する
//   controls.enableDamping = true;
//   controls.dampingFactor = 0.2;
//   controls.target.y = cSize * 0.5;
//   //controls.target.z = -16;

//   //console.log(controls);





//   const geometry = new THREE.PlaneGeometry(cSize, cSize, 1, 1);

//   //timeを設定
//   const uniforms = {
//     time: { type:'f', value: 0.0 }
//   };

//   const material = new THREE.RawShaderMaterial({
//     vertexShader: vertexSource,
//     fragmentShader: fragmentSource,
//     uniforms: uniforms,
//     side: THREE.FrontSide,
//     //wireframe: true
//   });

//   //const material = new THREE.MeshNormalMaterial();

//   const mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);
//   mesh.position.y = cSize * 0.5;
//   //console.log(mesh)



//   btnEle.addEventListener(tapStart, () => {
//     camera.position.set(0, 0, 8);
//     material.fragmentShader = document.querySelector('#ed').value;
//     triangle.material = material;
//     material.needsUpdate = true;
//   });




//   // 毎フレーム時に実行されるループイベント
//   let time = 0;
//   tick();
//   function tick() {
//     controls.update();
//     // レンダリング
//     time ++;
//     uniforms.time.value = time;
//     renderer.render(scene, camera);
//     requestAnimationFrame(tick);
//   }

// }

import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';



//バーテックスシェーダ
const vertexSource =`
//精度の指定を追加
precision mediump float;
//positionの宣言
attribute vec3 position;
//projectionMatrixの宣言
uniform mat4 projectionMatrix;
//modelViewMatrixの宣言
uniform mat4 modelViewMatrix;
    
void main() { 
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;


const fragmentSource = document.querySelector('#ed').value;

export default class ThreeEngine {
  constructor(init_size) {
    this.time = new Date();
    this.rot = 0;

    const body = document.querySelector('body');
    const width = Math.min(body.clientWidth, body.clientHeight);
    const height = width * 0.8;

    const canvasElement = document.querySelector('#myCanvas');

    // レンダラ作成
    this.render = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
    });
    this.render.setPixelRatio(window.devicePixelRatio);
    this.render.setSize(width, height);
    //console.log(this.render);

    // シーン作成
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x666666);
    const gridHelper = new THREE.GridHelper(128, 128);
    this.scene.add(gridHelper);

    // カメラ作成
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1e3);
    this.camera.position.set(0, init_size * 1.28, 0);
    // xxx: 180°回したい
    //this.camera.rotation.x = -(90* (Math.PI / 180));
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    // カメラコントローラーを作成
    this.controls = new OrbitControls(this.camera, canvasElement);
    // 滑らかにカメラコントローラーを制御する
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    this.geometry = new THREE.PlaneGeometry(init_size, init_size, 1, 1);
    
    const uniforms = {
      u_time: { type:'f', value: 0.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2()}
    };
  uniforms.u_resolution.value.x = this.render.domElement.width;
    uniforms.u_resolution.value.y = this.render.domElement.height;
    

    //this.material = new THREE.MeshNormalMaterial();
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertexSource,
      fragmentShader: fragmentSource,
      uniforms: uniforms,
      side: THREE.FrontSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -(90* (Math.PI / 180));
    this.scene.add(this.mesh);
    this.tick = this.tick.bind(this);
  }

  run(main) {
    requestAnimationFrame(main.tick);
  }

  tick() {
    this.controls.update();
    let nowTime = 0;
    nowTime = (Date.now() - this.time) / 1000;
    this.material.uniforms.u_time.value = nowTime;
    this.render.render(this.scene, this.camera);
    requestAnimationFrame(this.tick);
  }

}


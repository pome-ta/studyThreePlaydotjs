import ThreeEngine from './threeEngine.js';


const {tapStart, tapMove, tapEnd} = {
  tapStart: typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown',
  tapMove: typeof document.ontouchmove !== 'undefined' ? 'touchmove' : 'mousemove',
  tapEnd: typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup',
}

const init_size = 4;
const engine = new ThreeEngine(init_size);

function onReSize() {
  const body = document.querySelector('body');
  const width = Math.min(body.clientWidth, body.clientHeight);
  const height = width * 0.32;
  engine.render.setPixelRatio(window.devicePixelRatio);
  engine.render.setSize(width, height);
  engine.camera.aspect = width / height;
  engine.camera.updateProjectionMatrix();
}


function update() {
  engine.camera.position.set(0, init_size * 1.28, 0);
  engine.material.fragmentShader = document.querySelector('#ed').value;
}

window.addEventListener('load', engine.run(engine));
window.addEventListener('resize', onReSize);



const btn = document.querySelector('#btn');
btn.addEventListener(tapStart, update);


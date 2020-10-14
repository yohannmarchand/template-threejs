import * as THREE from './vendor/three.js-master/build/three.module.js';

const Scene = {
    vars : {
        container : null,
        scene : null,
        renderer : null,
        camera : null,
    },
    init: () => {
        Scene.vars.container = document.createElement('div');
        Scene.vars.container.classList.add('fullscreen');
        document.body.appendChild(Scene.vars.container);

        Scene.vars.scene = new THREE.Scene();
        Scene.vars.scene.background = new THREE.Color(0x313131);

        Scene.vars.renderer = new THREE.WebGLRenderer({antialias : true,});
        Scene.vars.renderer.setPixelRatio(window.devicePixelRatio);
        Scene.vars.renderer.setSize(window.innerWidth, window.innerHeight);
        Scene.vars.container.appendChild(Scene.vars.renderer.domElement);

        Scene.vars.camera = new THREE.PerspectiveCamera(
            45, //FOV
            window.innerWidth / window.innerHeight, //Resolution
            1, //Distance minimal de vision en Z
            2000 //Distance maximal de vision en Z
        );
        Scene.vars.camera.position.set(0,210,572)

        let ligth = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 0.5);
        Scene.vars.scene.add(ligth);

        let mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000,2000),
            new THREE.MeshLambertMaterial({color : new THREE.Color(0x323232)})
        );
        mesh.rotation.x = -Math.PI / 2;
        Scene.vars.scene.add(mesh);

        let grid = new THREE.GridHelper(2000,20,0x000000, 0x000000);
        grid.material.opacity = .2;
        grid.material.transparent = true;
        Scene.vars.scene.add(grid);

        window.addEventListener('resize', Scene.onResizeWindow, false);

        Scene.animate();
    },
    onResizeWindow : ()=> {
        Scene.vars.camera.aspect = window.innerWidth / window.innerHeight;
        Scene.vars.camera.updateProjectionMatrix();
        Scene.vars.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate : () => {
        Scene.render();
        window.requestAnimationFrame(Scene.animate)
    },
    render: ()=>{
        Scene.vars.renderer.render(Scene.vars.scene, Scene.vars.camera);
    },
};

Scene.init();
    import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
    import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

    function main() {
        const canvas = document.querySelector('#canvas');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 10, 100);
        camera.position.set(0,30,50)

        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 10, 0);
        controls.update();

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('lightblue');

        {
            const planeSize = 30;
            const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
            const planeMat = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = Math.PI * -.5;
            scene.add(mesh);
        }

        {
            const skyColor = 0x2f4363; 
            const groundColor = 0x2f4363;
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
        }

        {
            const color = 0x000000;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(5, 10, 2);
            scene.add(light);
            scene.add(light.target);
        }

        let mimikyu; 
        {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(
                './mimikyu/scene.gltf', (gltf) => {
                    const root = gltf.scene;
                    mimikyu = root;
                    scene.add(root);

                    root.scale.set(2.5, 2.5, 2.5)
                });
        }

        function render(time) {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    main()
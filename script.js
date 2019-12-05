    import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
    import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

    function main() {
        const canvas = document.querySelector('#canvas');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 10, 100);
        camera.position.set(-20,30,50)

        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 10, 0);
        controls.update();

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#a0b7db');

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

        let mimikyu, head, 
        earRight, earTipRight, earLeft,
        earTipLeft, tail; 
        
        {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(
                './mimikyu/scene.gltf', (gltf) => {
                    const root = gltf.scene;
                    mimikyu = root;
                    scene.add(root);

                    root.scale.set(2.5, 2.5, 2.5)
                    
                    head = root.getObjectByName('Head_Armature')
                    earRight = root.getObjectByName('EarR_Armature')
                    earTipRight = root.getObjectByName('Ear_tipR_Armature')
                    earLeft = root.getObjectByName('EarL_Armature')
                    earTipLeft = root.getObjectByName('Ear_tipL_Armature')
                    tail = root.getObjectByName('Tail_Armature')
                });
        }

        let unitMovementEarRight = -1,
        unitMovementEarLeft = -1,
        unitMovementEarTipRight = -1,
        unitMovementEarTipLeft = -1,
        unitMovementTail = -1,
        unitMovementHead = -1

        function animate() {    
            if (mimikyu) {          

                if (tail.rotation.y > 0.9 || tail.rotation.y < -0.7){                    
                    unitMovementTail = unitMovementTail * -1
                }

                if (head.rotation.z > 0.1 || head.rotation.z < -0.5){
                    unitMovementHead = unitMovementHead * -1
                }
                
                if (earLeft.rotation.z > 0.1 || earLeft.rotation.z < -0.5){
                    unitMovementEarLeft = unitMovementEarLeft * -1
                }

                if (earRight.rotation.z > 0.1 || earRight.rotation.z < -0.5){
                    unitMovementEarRight = unitMovementEarRight * -1
                }

                if (earTipLeft.rotation.z > 0.1 || earTipLeft.rotation.z < -0.5){
                    unitMovementEarTipLeft = unitMovementEarTipLeft * -1
                }

                if (earTipRight.rotation.z > 0.1 || earTipRight.rotation.z < -0.5){
                    unitMovementEarTipRight = unitMovementEarTipRight * -1
                }

                head.rotation.z += 0.005 * unitMovementHead
                earLeft.rotation.z += 0.01 * unitMovementEarLeft
                earRight.rotation.z += 0.01 * unitMovementEarRight
                earTipLeft.rotation.z += 0.01 * unitMovementEarTipLeft
                earTipRight.rotation.z += 0.01 * unitMovementEarTipRight
                tail.rotation.y += 0.01 * unitMovementTail
                tail.rotation.z += 0.01 * unitMovementTail
            }
        }

        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
            animate()
        }

        requestAnimationFrame(render);
    }

    main()
    
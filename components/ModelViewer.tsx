'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

type Props = {
  file?: File;
  url?: string;
  onAnalyzed?: (info:{volumeCm3:number, dims:{x:number,y:number,z:number}}) => void;
};

export default function ModelViewer({file, url, onAnalyzed}: Props){
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string|undefined>();

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth/mount.clientHeight, 0.1, 1000);
    camera.position.set(2,2,2);
    const controls = new OrbitControls(camera, renderer.domElement);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(3,3,3);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);

    let mesh: THREE.Mesh | null = null;

    function clearMesh(){
      if (mesh){
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as any).dispose?.();
        mesh = null;
      }
    }

    function computeVolume(geom: THREE.BufferGeometry){
      // Signed volume of a mesh (triangulated) using origin tetrahedrons
      const pos = geom.attributes.position.array as ArrayLike<number>;
      let volume = 0;
      for (let i=0; i<pos.length; i+=9){
        const ax = pos[i], ay = pos[i+1], az = pos[i+2];
        const bx = pos[i+3], by = pos[i+4], bz = pos[i+5];
        const cx = pos[i+6], cy = pos[i+7], cz = pos[i+8];
        volume += (ax * (by*cz - bz*cy) - ay * (bx*cz - bz*cx) + az * (bx*cy - by*cx)) / 6;
      }
      return Math.abs(volume); // in world units^3
    }

    async function load(){
      try{
        clearMesh();
        let arrayBuffer: ArrayBuffer;
        let name = "model.stl";
        if (file){
          arrayBuffer = await file.arrayBuffer();
          name = file.name.toLowerCase();
        } else if (url){
          arrayBuffer = await fetch(url).then(r=>r.arrayBuffer());
          name = url.toLowerCase();
        } else {
          setError('Нет файла для просмотра');
          return;
        }

        let geometry: THREE.BufferGeometry | null = null;

        if (name.endsWith('.stl')){
          const loader = new STLLoader();
          geometry = loader.parse(arrayBuffer as ArrayBuffer);
        } else if (name.endsWith('.obj')){
          const loader = new OBJLoader();
          const text = new TextDecoder().decode(arrayBuffer);
          const obj = loader.parse(text);
          const g = new THREE.BufferGeometry();
          // merge first mesh only (demo)
          obj.traverse((child: any)=>{
            if (child.isMesh && !geometry){
              geometry = child.geometry;
            }
          });
        } else {
          setError('Поддерживаются STL/OBJ');
          return;
        }

        if (!geometry){ setError('Не удалось загрузить геометрию'); return; }

        geometry.computeBoundingBox();
        const bb = geometry.boundingBox!;
        const dims = new THREE.Vector3().subVectors(bb.max, bb.min);
        const material = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness:0.1, roughness:0.8 });
        mesh = new THREE.Mesh(geometry, material);
        geometry.center();
        scene.add(mesh);

        const size = Math.max(dims.x, dims.y, dims.z);
        const dist = size * 2.5 + 1;
        camera.position.set(dist, dist, dist);
        camera.lookAt(0,0,0);
        controls.update();

        const vol = computeVolume(geometry); // in unit^3 (assuming mm^3 if model units are mm)
        // Heuristic: assume model units are mm; convert mm^3 -> cm^3
        const volumeCm3 = vol / 1000.0;

        onAnalyzed?.({
          volumeCm3,
          dims: { x: dims.x, y: dims.y, z: dims.z }
        });

      }catch(e:any){
        setError(e.message || 'Ошибка загрузки');
      }
    }

    load();

    const handle = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth/mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handle);

    const anim = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(anim);
    };
    anim();

    return () => {
      window.removeEventListener('resize', handle);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [file, url, onAnalyzed]);

  return (
    <div className="card w-full h-80 overflow-hidden">
      <div ref={mountRef} className="w-full h-80" />
      {error && <div className="p-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}

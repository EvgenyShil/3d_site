'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

type Dimensions = { x: number; y: number; z: number };

type AnalysisResult = {
  volumeCm3: number;
  dims: Dimensions;
};

type Props = {
  file?: File;
  url?: string;
  onAnalyzed?: (info: AnalysisResult) => void;
};

export default function ModelViewer({ file, url, onAnalyzed }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    setError(undefined);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const pixelRatio =
      typeof window === 'undefined' ? 1 : window.devicePixelRatio ?? 1;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const grid = new THREE.GridHelper(10, 10);
    scene.add(grid);

    let mesh: THREE.Mesh | null = null;
    let cancelled = false;

    const disposeMesh = () => {
      if (!mesh) return;
      scene.remove(mesh);
      mesh.geometry.dispose();
      const { material } = mesh;
      if (Array.isArray(material)) {
        material.forEach((mat) => mat.dispose());
      } else {
        material.dispose();
      }
      mesh = null;
    };

    const computeVolume = (geom: THREE.BufferGeometry) => {
      const pos = geom.attributes.position?.array as ArrayLike<number> | undefined;
      if (!pos) return 0;
      let volume = 0;
      for (let i = 0; i < pos.length; i += 9) {
        const ax = pos[i],
          ay = pos[i + 1],
          az = pos[i + 2];
        const bx = pos[i + 3],
          by = pos[i + 4],
          bz = pos[i + 5];
        const cx = pos[i + 6],
          cy = pos[i + 7],
          cz = pos[i + 8];
        volume +=
          (ax * (by * cz - bz * cy) -
            ay * (bx * cz - bz * cx) +
            az * (bx * cy - by * cx)) /
          6;
      }
      return Math.abs(volume);
    };

    const load = async () => {
      try {
        disposeMesh();

        let arrayBuffer: ArrayBuffer | null = null;
        let sourceName = 'model.stl';

        if (file) {
          arrayBuffer = await file.arrayBuffer();
          sourceName = file.name.toLowerCase();
        } else if (url) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Не удалось загрузить файл: ${response.statusText}`);
          }
          arrayBuffer = await response.arrayBuffer();
          sourceName = url.toLowerCase();
        } else {
          setError('Нет файла для просмотра');
          return;
        }

        if (cancelled) {
          return;
        }

        if (!arrayBuffer) {
          setError('Не удалось получить содержимое файла');
          return;
        }

        let geometry: THREE.BufferGeometry | null = null;

        if (sourceName.endsWith('.stl')) {
          const loader = new STLLoader();
          geometry = loader.parse(arrayBuffer);
        } else if (sourceName.endsWith('.obj')) {
          const loader = new OBJLoader();
          const text = new TextDecoder().decode(arrayBuffer);
          const obj = loader.parse(text);
          obj.traverse((child) => {
            if (geometry || !('isMesh' in child) || !(child as any).isMesh) return;
            const childMesh = child as THREE.Mesh;
            if (childMesh.geometry instanceof THREE.BufferGeometry) {
              geometry = childMesh.geometry.clone();
            }
          });
        } else {
          setError('Поддерживаются только файлы STL или OBJ');
          return;
        }

        if (cancelled) {
          geometry?.dispose();
          return;
        }

        if (!geometry) {
          setError('Не удалось загрузить геометрию');
          return;
        }

        geometry.computeBoundingBox();
        const bounds = geometry.boundingBox;
        if (!bounds) {
          setError('Не удалось вычислить габариты модели');
          return;
        }

        const dimsVector = new THREE.Vector3().subVectors(bounds.max, bounds.min);
        const dims: Dimensions = {
          x: dimsVector.x,
          y: dimsVector.y,
          z: dimsVector.z,
        };

        const material = new THREE.MeshStandardMaterial({
          color: 0x9ca3af,
          metalness: 0.1,
          roughness: 0.8,
        });

        if (cancelled) {
          material.dispose();
          geometry.dispose();
          return;
        }

        mesh = new THREE.Mesh(geometry, material);
        geometry.center();
        scene.add(mesh);

        const size = Math.max(dims.x, dims.y, dims.z);
        const dist = size * 2.5 + 1;
        camera.position.set(dist, dist, dist);
        camera.lookAt(0, 0, 0);
        controls.update();

        const volume = computeVolume(geometry);
        const volumeCm3 = volume / 1000;

        if (!cancelled) {
          onAnalyzed?.({
            volumeCm3,
            dims,
          });
        }
      } catch (e) {
        if (!cancelled) {
          const message = e instanceof Error ? e.message : 'Ошибка загрузки';
          setError(message);
        }
      }
    };

    load();

    const handleResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    let frameId: number | null = null;
    const renderLoop = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };
    frameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      controls.dispose();
      disposeMesh();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [file, url, onAnalyzed]);

  return (
    <div className="card w-full h-80 overflow-hidden">
      <div ref={mountRef} className="w-full h-80" />
      {error && <div className="p-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}

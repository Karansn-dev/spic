import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

export default function ThreeDarkBackground({ className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let renderer: any;
    let scene: any;
    let camera: any;
    let frameId: number;

    const init = async () => {
      const THREE = await import("three");

      if (!containerRef.current) return;

      scene = new THREE.Scene();

      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.z = 120;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      renderer.domElement.style.pointerEvents = "none";

      containerRef.current.appendChild(renderer.domElement);

      // ==========================
      // SPHERICAL PARTICLE SYSTEM
      // ==========================

      const particles = 700;
      const radius = 120;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particles * 3);

      for (let i = 0; i < particles; i++) {
        const u = Math.random();
        const v = Math.random();

        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);

        const r = radius * Math.cbrt(Math.random());
        // Math.cbrt ensures uniform density inside sphere

        positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        color: 0x88aaff,
        size: 0.8,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      });

      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

      // ==========================
      // RESIZE HANDLER
      // ==========================

      const handleResize = () => {
        if (!containerRef.current) return;

        const w = containerRef.current.clientWidth || window.innerWidth;
        const h = containerRef.current.clientHeight || window.innerHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // ==========================
      // ANIMATION LOOP
      // ==========================

      let t = 0;

      const animate = () => {
        t += 0.01;

        pointCloud.rotation.y = t * 0.3;
        pointCloud.rotation.x = Math.sin(t * 0.2) * 0.15;

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };

      animate();

      // ==========================
      // CLEANUP
      // ==========================

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);

        geometry.dispose();
        material.dispose();

        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}

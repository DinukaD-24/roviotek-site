import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const LiquidChrome = ({
  baseColor = [0.15, 0.15, 0.15],
  speed = 0.15,
  amplitude = 0.18,
  frequencyX = 2.5,
  frequencyY = 2.5,
  interactive = true,
  style,
  ...rest
}) => {
  const containerRef = useRef(null);

  // Keep latest prop values in refs so the animation loop always reads current values
  // without needing to re-create the WebGL context on every render.
  const baseColorRef  = useRef(baseColor);
  const speedRef      = useRef(speed);
  const amplitudeRef  = useRef(amplitude);
  const freqXRef      = useRef(frequencyX);
  const freqYRef      = useRef(frequencyY);
  const interactiveRef = useRef(interactive);

  // Sync refs whenever props change (no WebGL rebuild needed)
  baseColorRef.current   = baseColor;
  speedRef.current       = speed;
  amplitudeRef.current   = amplitude;
  freqXRef.current       = frequencyX;
  freqYRef.current       = frequencyY;
  interactiveRef.current = interactive;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new Renderer({ antialias: true });
    const gl = renderer.gl;
    // Dark clear colour — no white flash even before first frame
    gl.clearColor(0.05, 0.05, 0.05, 1.0);

    const vertexShader = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3  uResolution;
      uniform vec3  uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2  uMouse;
      varying vec2  vUv;

      vec4 renderImage(vec2 uvCoord) {
        vec2 fragCoord = uvCoord * uResolution.xy;
        vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

        for (float i = 1.0; i < 10.0; i++) {
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
        }

        vec2  diff   = uvCoord - uMouse;
        float dist   = length(diff);
        float falloff = exp(-dist * 20.0);
        float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
        uv += (diff / (dist + 0.0001)) * ripple * falloff;

        vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
        return vec4(color, 1.0);
      }

      void main() {
        vec4 col     = vec4(0.0);
        int  samples = 0;
        for (int i = -1; i <= 1; i++) {
          for (int j = -1; j <= 1; j++) {
            vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
            col += renderImage(vUv + offset);
            samples++;
          }
        }
        gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(gl);
    const program  = new Program(gl, {
      vertex:   vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime:       { value: 0 },
        uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]) },
        uBaseColor:  { value: new Float32Array(baseColorRef.current) },
        uAmplitude:  { value: amplitudeRef.current },
        uFrequencyX: { value: freqXRef.current },
        uFrequencyY: { value: freqYRef.current },
        uMouse:      { value: new Float32Array([0.5, 0.5]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      const r = program.uniforms.uResolution.value;
      r[0] = gl.canvas.width;
      r[1] = gl.canvas.height;
      r[2] = gl.canvas.width / gl.canvas.height;
    }
    window.addEventListener('resize', resize);
    resize();

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      const m = program.uniforms.uMouse.value;
      m[0] = (e.clientX - rect.left) / rect.width;
      m[1] = 1 - (e.clientY - rect.top)  / rect.height;
    }
    function handleTouchMove(e) {
      if (!e.touches.length) return;
      const t = e.touches[0];
      const rect = container.getBoundingClientRect();
      const m = program.uniforms.uMouse.value;
      m[0] = (t.clientX - rect.left) / rect.width;
      m[1] = 1 - (t.clientY - rect.top)  / rect.height;
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);

    // Append canvas before starting loop so first frame paints immediately
    gl.canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    container.appendChild(gl.canvas);

    let animId;
    function update(t) {
      animId = requestAnimationFrame(update);

      // Update uniforms from refs (no effect rebuild required)
      program.uniforms.uTime.value       = t * 0.001 * speedRef.current;
      program.uniforms.uAmplitude.value  = amplitudeRef.current;
      program.uniforms.uFrequencyX.value = freqXRef.current;
      program.uniforms.uFrequencyY.value = freqYRef.current;
      const bc = baseColorRef.current;
      program.uniforms.uBaseColor.value[0] = bc[0];
      program.uniforms.uBaseColor.value[1] = bc[1];
      program.uniforms.uBaseColor.value[2] = bc[2];

      renderer.render({ scene: mesh });
    }
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      if (gl.canvas.parentElement) gl.canvas.parentElement.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []); // ← empty: WebGL context created exactly once, never torn down on prop changes

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}
      {...rest}
    />
  );
};

export default LiquidChrome;
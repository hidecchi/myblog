"use client";

import { mat4 } from "gl-matrix";
import { useEffect, useRef } from "react";
import { debounce } from "utils/utils";
import { setProgram } from "utils/webglUtils";

import fragmentShaderSource from "./fragmentShader.glsl";
import vertexShaderSource from "./vertexShader.glsl";

export const WebglRayMarchingObject = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstSetUpRef = useRef<boolean>(true);

  useEffect(() => {
    if (!firstSetUpRef.current) return;
    if (!canvasRef.current) return;
    if (!canvasRef.current.parentElement) return;

    firstSetUpRef.current = false;

    const parentWidth = canvasRef.current.parentElement.clientWidth;
    const aspectRatio = 1000 / 1000;

    canvasRef.current.width = parentWidth;
    canvasRef.current.height = parentWidth * aspectRatio;

    const gl = canvasRef.current.getContext("webgl2");
    const program = gl && gl.createProgram();

    if (!gl || !program) return;

    setProgram(gl, program, vertexShaderSource, fragmentShaderSource);
    gl.enable(gl.DEPTH_TEST);

    //////////////////////// attributeの設定　////////////////////////
    const vertexData = [
      -1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0, 1, -1, 0, -1, 1, 0,
    ];
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexData),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(0);
    //////////////////////// attributeの設定　////////////////////////

    const modelLoc = gl.getUniformLocation(program, "uModel");
    const viewLoc = gl.getUniformLocation(program, "uView");
    const projectionLoc = gl.getUniformLocation(program, "uProjection");
    const tickLoc = gl.getUniformLocation(program, "uTick");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");

    const model = mat4.create();
    const view = mat4.create();
    const projection = mat4.create();

    // mat4.rotateZ(model, model, 0.1);
    // モデル行列 (スケール調整)
    mat4.identity(model);
    mat4.scale(model, model, [1.0, 1.0, 1.0]); // スケールは1でメッシュ全体が表示されるように調整

    // ビュー行列 (カメラ位置と方向を設定)
    mat4.identity(view);
    mat4.lookAt(view, [0.0, 0.0, 1.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]); // カメラをZ軸正方向に配置

    // 射影行列 (正射影でキャンバス全体を表示)
    const aspect = canvasRef.current.width / canvasRef.current.height; // キャンバスのアスペクト比を取得
    const size = 1.0; // 描画領域のサイズ (大きいほど広い範囲を表示)
    mat4.ortho(
      projection,
      -size * aspect,
      size * aspect,
      -size,
      size,
      0.1,
      10.0
    ); // アスペクト比を考慮した設定

    gl.uniformMatrix4fv(viewLoc, false, view);
    gl.uniformMatrix4fv(projectionLoc, false, projection);
    gl.uniform2fv(mouseLoc, [0.0, 0.0]);

    let tick = 0;
    gl.uniform1f(tickLoc, tick);
    const draw = () => {
      requestAnimationFrame(draw);

      gl.uniformMatrix4fv(modelLoc, false, model);
      tick += 1;

      gl.uniform1f(tickLoc, tick);
      gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
    };
    draw();

    const onWindowResize = debounce(() => {
      if (!canvasRef.current) return;
      if (!canvasRef.current.parentElement) return;

      const parentWidth = canvasRef.current.parentElement.clientWidth;
      canvasRef.current.width = parentWidth;
      canvasRef.current.height = parentWidth * aspectRatio;

      const gl = canvasRef.current.getContext("webgl2");
      if (gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    }, 30);

    const onMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      const { clientX, clientY } = event; // マウス座標を取得
      // console.log(
      //   canvasRef.current.getBoundingClientRect().top + window.scrollY
      // );
      // console.log(clientY + window.scrollY);
      const buffer = clientY - canvasRef.current.getBoundingClientRect().top;
      clientY - canvasRef.current.getBoundingClientRect().top + window.scrollY;
      const mouseX = (clientX / window.innerWidth) * 2 - 1;
      const mouseY = 1 - (buffer / window.innerWidth) * 2;
      // console.log(mouseX, mouseY);
      gl.uniform2fv(mouseLoc, [mouseX, mouseY]);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (process.env.ENV !== "develop") {
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, []);

  return (
    <canvas id="webgl-canvas" ref={canvasRef} style={{ margin: "0 auto" }} />
  );
};

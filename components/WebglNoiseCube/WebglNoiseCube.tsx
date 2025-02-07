"use client";

import { mat4 } from "gl-matrix";
import { useEffect, useRef } from "react";
import { debounce } from "utils/utils";
import { setProgram } from "utils/webglUtils";

import fragmentShaderSource from "./fragmentShader.glsl";
import vertexShaderSource from "./vertexShader.glsl";

export const WebglNoiseCube = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstSetUpRef = useRef<boolean>(true);

  useEffect(() => {
    if (!firstSetUpRef.current) return;
    if (!canvasRef.current) return;
    if (!canvasRef.current.parentElement) return;

    firstSetUpRef.current = false;

    const parentWidth = canvasRef.current.parentElement.clientWidth;
    const aspectRatio = 550 / 1000;

    canvasRef.current.width = parentWidth;
    canvasRef.current.height = parentWidth * aspectRatio;

    const gl = canvasRef.current.getContext("webgl2");
    const program = gl && gl.createProgram();

    if (!gl || !program) return;

    setProgram(gl, program, vertexShaderSource, fragmentShaderSource);
    gl.enable(gl.DEPTH_TEST);

    //////////////////////// attributeの設定　////////////////////////

    let vertexData = [];
    let vertexData2 = [];
    const radius = 1;
    const latSegments = 100; // 緯度方向の分割数
    const lonSegments = 100; // 経度方向の分割数

    for (let lat = 0; lat <= latSegments; lat++) {
      const theta = (lat * Math.PI) / latSegments;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= lonSegments; lon++) {
        const phi = (lon * 2 * Math.PI) / lonSegments;
        const x = radius * sinTheta * Math.cos(phi);
        const y = radius * sinTheta * Math.sin(phi);
        const z = radius * cosTheta;

        vertexData.push(x);
        vertexData.push(y);
        vertexData.push(z);
      }
    }
    for (let index = 0; index < vertexData.length; index++) {
      if (index % 3 === 1) {
        vertexData2.push(0);
      } else {
        vertexData2.push(vertexData[index]);
      }
    }

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexData),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 12, 12);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);

    const vertexBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexData2),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 12, 0);
    gl.vertexAttribPointer(3, 3, gl.FLOAT, false, 12, 12);
    gl.enableVertexAttribArray(2);
    gl.enableVertexAttribArray(3);

    const indexData = [];
    for (let lat = 0; lat < latSegments; lat++) {
      for (let lon = 0; lon < lonSegments; lon++) {
        const first = lat * (lonSegments + 1) + lon;
        const second = first + lonSegments + 1;

        indexData.push(first, second, first + 1);
        indexData.push(second, second + 1, first + 1);
      }
    }
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indexData),
      gl.STATIC_DRAW
    );

    const modelLoc = gl.getUniformLocation(program, "uModel");
    const viewLoc = gl.getUniformLocation(program, "uView");
    const projectionLoc = gl.getUniformLocation(program, "uProjection");
    const tickLoc = gl.getUniformLocation(program, "uTick");

    const model = mat4.create();
    const view = mat4.create();
    const projection = mat4.create();

    mat4.rotateZ(model, model, 0.1);
    mat4.scale(model, model, [0.8, 0.8, 0.8]);

    mat4.lookAt(view, [0.6, 0.6, 0.6], [0, 0, 0], [0, 1, 0]);
    mat4.ortho(projection, -1, 1, -1, 1, -1, 2);

    gl.uniformMatrix4fv(viewLoc, false, view);
    gl.uniformMatrix4fv(projectionLoc, false, projection);

    let tick = 0;
    gl.uniform1f(tickLoc, tick);
    const draw = () => {
      requestAnimationFrame(draw);

      // mat4.rotate(model, model, 0.02, [1, 1, 0]);
      gl.uniformMatrix4fv(modelLoc, false, model);

      tick += 1;
      gl.uniform1f(tickLoc, tick);

      // gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
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

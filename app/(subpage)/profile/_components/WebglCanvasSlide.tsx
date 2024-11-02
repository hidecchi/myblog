"use client";

import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "utils/utils";
import { createTexture, loadGLSLFile, setProgram } from "utils/webglUtils";

import styles from "./WebglCanvasSlide.module.scss";

const slideItems = [
  {
    text: "Shisha Cafe&Barランデヴー様",
    link: "https://rendezvous-shisha.com/",
  },
  { text: "飲食テナントナビ様", link: "https://fukuokatenpo.com/" },
];

export const WebglCanvasSlide = () => {
  const canvasWrapRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstSetUpRef = useRef<boolean>(true);

  const tickRef = useRef<number>(0);

  useEffect(() => {
    (async () => {
      if (!firstSetUpRef.current) return;
      if (!canvasRef.current) return;
      if (!canvasRef.current.parentElement) return;

      firstSetUpRef.current = false;

      // 親要素の幅に基づき、Canvasのサイズを設定
      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const aspectRatio = 550 / 1000; // 使用する画像のアスペクト比

      canvasRef.current.width = parentWidth; // 親要素の幅から40pxを引いた値
      canvasRef.current.height = parentWidth * aspectRatio;

      //////////////////////// 定型　////////////////////////
      const gl = canvasRef.current.getContext("webgl2");
      const program = gl && gl.createProgram();

      const [vertexShaderSource, fragmentShaderSource] = await Promise.all([
        loadGLSLFile("vertexShader.glsl"),
        loadGLSLFile("fragmentShader.glsl"),
      ]);

      if (!gl || !program || !vertexShaderSource || !fragmentShaderSource)
        return;

      setProgram(gl, program, vertexShaderSource, fragmentShaderSource);
      gl.enable(gl.DEPTH_TEST);
      //////////////////////// 定型  ////////////////////////

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

      //////////////////////// textureの設定　////////////////////////
      await createTexture(
        gl,
        program,
        "uSampler",
        5,
        "/randevouz.jpg",
        1000,
        550
      );
      await createTexture(
        gl,
        program,
        "uSampler2",
        6,
        "/tenant-navi.jpg",
        1000,
        550
      );
      //////////////////////// textureの設定　////////////////////////

      const tickLoc = gl.getUniformLocation(program, "uTick");

      gl.uniform1f(tickLoc, tickRef.current);
      const draw = () => {
        requestAnimationFrame(draw);

        gl.uniform1f(tickLoc, tickRef.current);
        gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
      };

      draw();
    })();

    const onWindowResize = debounce(() => {
      if (!canvasRef.current) return;
      if (!canvasRef.current.parentElement) return;
      // 親要素の幅に基づき、Canvasのサイズを設定
      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const aspectRatio = 550 / 1000; // 使用する画像のアスペクト比

      canvasRef.current.width = parentWidth; // 親要素の幅から40pxを引いた値
      canvasRef.current.height = parentWidth * aspectRatio;

      const gl = canvasRef.current.getContext("webgl2");
      if (gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    }, 30);

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  return (
    <>
      <a
        className={styles.canvasWrap}
        ref={canvasWrapRef}
        target="_blank"
        rel="noopener noreferrer"
        href={slideItems[0].link}
      >
        <canvas
          id="webgl-canvas"
          ref={canvasRef}
          style={{ margin: "0 auto" }}
        />
      </a>
      <ContorolPanel tickRef={tickRef} canvasWrapRef={canvasWrapRef} />
    </>
  );
};

const ContorolPanel = ({
  tickRef,
  canvasWrapRef,
}: {
  tickRef: MutableRefObject<number>;
  canvasWrapRef: RefObject<HTMLAnchorElement>;
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const onClickPrev = () => {
    if (tickRef.current === 0) return;
    // const currentTick = tickRef.current;
    const timer = setInterval(() => {
      tickRef.current = tickRef.current -= 6;
      console.log(tickRef.current);
      if (tickRef.current === 0) {
        clearInterval(timer);
      }
    }, 1);
    setSlideIndex(0);
    if (canvasWrapRef.current) canvasWrapRef.current.href = slideItems[0].link;
  };

  const onClickNext = () => {
    if (tickRef.current >= 1000) return;
    const currentTick = tickRef.current;
    const timer = setInterval(() => {
      tickRef.current = tickRef.current += 6;
      console.log(tickRef.current);
      if (tickRef.current >= currentTick + 1000) {
        clearInterval(timer);
      }
    }, 1);
    setSlideIndex(1);
    if (canvasWrapRef.current) canvasWrapRef.current.href = slideItems[1].link;
  };

  return (
    <div className={styles.controlPanel}>
      <p className={styles.slideItemName}>{slideItems[slideIndex]?.text}</p>
      <div className={styles.controlPanelBottom}>
        <button
          onClick={onClickPrev}
          className={styles.prevButton}
          disabled={slideIndex === 0}
          aria-label="前のスライドへ"
        />
        <button
          onClick={onClickNext}
          className={styles.nextButton}
          disabled={slideIndex === slideItems.length - 1}
          aria-label="次のスライドへ"
        />
        <span className={styles.indexInfo}>
          {slideIndex + 1} / {slideItems.length}
        </span>
      </div>
    </div>
  );
};

export const loadGLSLFile = async (filename: string) => {
  return fetch(filename)
    .then((response) => response.text())
    .catch((errror) => console.log(errror));
};

export const loadImage = async (
  imageSource: string
): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.src = imageSource;
  });
};

export const setProgram = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) throw new Error("");
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  gl.attachShader(program, vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragmentShader) throw new Error("");
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
  }

  gl.useProgram(program);
};

export const createTexture = async (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  uniformName: string,
  textureUnit: number,
  imageSrc: string,
  width: number,
  height: number
) => {
  const loc = gl.getUniformLocation(program, uniformName);
  gl.uniform1i(loc, textureUnit);
  const image = (await loadImage(imageSrc)) as unknown;
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + textureUnit); // Activate texture #5
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    image as ArrayBufferView
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
};

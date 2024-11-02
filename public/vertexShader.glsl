#version 300 es
      #pragma vscode_glsllint_stage: vert

layout(location = 0) in vec4 aPosition;

out vec4 vTexCoord;

void main() {
    vTexCoord = vec4((aPosition.x + 1.0f), (aPosition.y - 1.0f) * -1.0f, 0.0f, 0.0f) * 0.5f;
    gl_Position = aPosition;
    gl_PointSize = 50.0f;
}
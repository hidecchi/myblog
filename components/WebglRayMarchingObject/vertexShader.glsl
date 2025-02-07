#version 300 es
      #pragma vscode_glsllint_stage: vert

uniform mat4 uModel;
uniform mat4 uView;
uniform mat4 uProjection;

layout(location = 0) in vec4 aPosition;

out vec4 vTexCoord;

void main() {
    vTexCoord = aPosition;
    gl_Position = uProjection * uView * uModel * aPosition;
}
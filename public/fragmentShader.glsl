#version 300 es
      #pragma vscode_glsllint_stage: frag

precision mediump float;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float uTick;

in vec4 vTexCoord;
out vec4 fragColor;

void main() {

    float mixture = smoothstep(0.0f, 1.0f, (vTexCoord.y - uTick * 0.002f + 1.0f));
    float xDistort = (-1.0f * (mixture - 0.5f) * (mixture - 0.5f) + 0.25f) * (0.5f - vTexCoord.x) * 0.5f;
    vec2 resultUV = vec2(vTexCoord.x + xDistort, vTexCoord.y);
    vec4 texture1 = texture(uSampler, resultUV);
    vec4 texture2 = texture(uSampler2, resultUV);

    fragColor = texture1 * mixture + (1.0f - mixture) * texture2;
}
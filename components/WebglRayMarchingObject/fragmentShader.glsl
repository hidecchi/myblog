#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

uniform float uTick;
uniform vec2 uMouse;

in vec4 vTexCoord;
out vec4 fragColor;

mat4 rotation3d(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0f - c;

    return mat4(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0f, oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0f, oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s, oc * axis.z * axis.z + c, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f);
}

// 引数として受け取ったベクトル(v)を任意の回転軸(axis)に沿って回転(angle)させる関数。回転後のベクトルを返す。
vec3 rotate(vec3 v, vec3 axis, float angle) {
  // rotate3dは第一引数に回転軸ベクトル、第二引数に回転角を取る
    mat4 matR = rotation3d(axis, angle);
    return (matR * vec4(v, 1.0f)).xyz; // vはアフィン変換するために4次元にする。
}

// ２つの距離関数をスムーズに結合する関数。a,bは距離関数、kは係数
// ２つの関数から微分可能になるような関数を作る。（右微分係数と左微分係数が一致するような関数を作れば良い）。
float smin(float a, float b, float k) {
    float h = clamp(0.5f + 0.5f * (b - a) / k, 0.0f, 1.0f);
    return mix(b, a, h) - k * h * (1.0f - h);
}

// 環境マップを返す関数, eyeは光線ray、normalはSDFの法線ベクトル
vec2 getmatcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903f * sqrt(reflected.z + 1.0f);
    return reflected.xy / m + 0.5f;
}

// 球のSDF。半径r、中心が空間の原点
// float sphereSDF(vec3 p, float r) {
//   return length(p) - r;
// }

// 立方体のSDF
float boxSDF(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0f)) + min(max(q.x, max(q.y, q.z)), 0.0f);
}
// 球のSDF
float sphereSDF(vec3 p, vec3 b, float r) {
    return length(p - b) - r;
}

// 空間全体のSDF
float sceneSDF(vec3 p) {
    vec3 pRotated = rotate(p, vec3(1.0f), uTick / 200.f);
    vec3 pAxisYRotete = rotate(pRotated, vec3(0.0f, 1.0f, 0.0f), uTick / 200.f);

  // マウスに追従する球
    // float sphereMouse = sphereSDF(p - 2.5f * vec3(uMouse * uHover - vec2(0.5f) * uHover, 0.0f), 0.5f);

    // float octa = octaSDF(pAxisYRotete, 1.2f);
  // float box = sdBoxFrame(pAxisYRotete, vec3(0.6), 0.05);
    float box = boxSDF(p, vec3(0.3f));
    float sphere = sphereSDF(p, vec3(uMouse.xy, 0.0f), 0.4f);

    float mixed = mix(box, sphere, 0.3f);
    return mixed;

    // float final = smin(sphereMouse, mixed, 0.8f);

    return box;
}

// 点pにおける、SDFの等値面との法線ベクトルを求める関数。
vec3 gradSDF(vec3 p) {
    float eps = 0.001f; // 微小変化量
    return normalize(vec3(sceneSDF(p + vec3(eps, 0.0f, 0.0f)) - sceneSDF(p - vec3(eps, 0.0f, 0.0f)), // x成分の偏微分
    sceneSDF(p + vec3(0.0f, eps, 0.0f)) - sceneSDF(p - vec3(0.0f, eps, 0.0f)), // y成分の偏微分
    sceneSDF(p + vec3(0.0f, 0.0f, eps)) - sceneSDF(p - vec3(0.0f, 0.0f, eps))  // z成分の偏微分
    ));
}

void main() {
    // カメラ（視点）の位置
    vec3 cPos = vec3(0.0f, 0.0f, 2.0f);

        // 光源の位置
    vec3 lPos = vec3(2.0f);

    // レイの方向（カメラはZ軸負方向を向く）
    vec3 ray = normalize(vec3(vTexCoord.xy, -2.0f));

    // レイの開始位置
    vec3 rPos = cPos;

    // fragColor = vec4(vTexCoord.x, vTexCoord.y, 0.0f, 1.0f);

    // 出力色（背景色は白）
    fragColor = vec4(1.0f, 1.0f, 1.0f, 1.0f);

    // レイマーチングループ
    for(int i = 0; i < 54; i++) {
        // 現在位置でのSDF値を計算
        // float dist = sphereSDF(rPos, vec3(0.0f, 0.0f, 1.0f), 0.4f);
        // float dist = boxSDF(rPos, vec3(0.3f));
        float dist = sceneSDF(rPos);

        // 距離が非常に小さくなったら命中（立方体の表面に到達）
        if(dist < 0.001f) {
            // 青色に設定
            // fragColor = vec4(0.0f, 0.0f, 0.0f, 1.0f);
            float amb = 0.5f; // 環境光の強さ
            // 拡散光の計算。光線の位置（物体にヒットしたポイント）から光源に伸びるベクトルとSDFの法線ベクトルとの内積を計算する。
            // 内積がマイナスになる（角度が180度以上になる場合）場合は0にする。
            vec3 sdfNormal = gradSDF(rPos);
            float diff = 0.1f * max(dot(normalize(cPos - rPos), sdfNormal), 0.0f);

            // スフィア環境マップ作成
            vec2 matcapUV = getmatcap(ray, sdfNormal);
            vec3 color = vec3(0.0f);

            color *= diff + amb;

            fragColor = vec4(diff, diff, 0.5f, 0.3f);
            break;
        }

        // レイの進行（光線を進める）
        rPos += dist * ray;

        // 距離が非常に大きくなったら背景に戻る（無限遠判定）
        if(length(rPos) > 10.0f) {
            break;
        }
    }

}

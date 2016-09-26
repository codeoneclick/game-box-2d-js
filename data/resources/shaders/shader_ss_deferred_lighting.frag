
varying vec2 v_texcoord;

uniform sampler2D sampler_01;
uniform sampler2D sampler_02;

void main()
{
    vec3 diffuse_color = texture2D(sampler_01, v_texcoord).rgb;
    vec3 diffuse_intensity = texture2D(sampler_02, v_texcoord).rgb;
    diffuse_color = diffuse_color * diffuse_intensity;
    gl_FragColor = vec4(diffuse_color, 1.0);
}


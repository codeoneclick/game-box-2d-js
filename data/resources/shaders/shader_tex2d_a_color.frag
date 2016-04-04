varying vec2 v_texcoord;

uniform sampler2D sampler_01;
uniform vec4 u_color;

void main(void)
{
    gl_FragColor = texture2D(sampler_01, v_texcoord);
}
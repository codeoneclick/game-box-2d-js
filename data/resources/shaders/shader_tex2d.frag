varying vec2 v_texcoord;

uniform sampler2D sampler_01;

void main(void)
{
    gl_FragColor = texture2D(sampler_01, v_texcoord);
}
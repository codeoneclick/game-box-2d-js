varying vec2 v_texcoord;

void main(void)
{
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texcoord = a_texcoord;
}

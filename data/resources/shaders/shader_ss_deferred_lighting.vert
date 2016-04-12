varying vec2 v_texcoord;

void main(void)
{
    v_texcoord = a_texcoord;
    gl_Position = vec4(a_position, 0.0, 1.0);
}

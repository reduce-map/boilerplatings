<script>
export default {
  name: 'RenderSlot',
  functional: true,
  render: (_, { props: { node } }) => [node],
}
</script>

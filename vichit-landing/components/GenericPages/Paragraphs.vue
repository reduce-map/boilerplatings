<script>
import { getRandomString } from '@/utils/helper'
function getSpanChunks(h, paragraph) {
  const paragraphChunkKey = getRandomString('ParagraphsChunk')
  return paragraph.chunks.map((chunk, i) => {
    return h(
      'span',
      {
        key: `${paragraphChunkKey}-${i}`,
        class: {
          'paragraph__text-highlight': chunk.highlight,
        },
      },
      [chunk.text]
    )
  })
}
export default {
  name: 'Paragraphs',
  functional: true,
  render: (h, { props: { paragraphs } }) => {
    const paragraphsKey = getRandomString('Paragraphs')
    return paragraphs.map((paragraph, i) => {
      const chunks = getSpanChunks(h, paragraph)
      return h(
        'p',
        {
          key: `${paragraphsKey}-${i}`,
          class: 'paragraph',
        },
        chunks
      )
    })
  },
}
</script>
<style lang="scss" scoped>
.paragraph {
  @apply pb-6;
}

.paragraph__text-highlight {
  color: var(--white);
  background: rgba(
    var(--velvet-violet-rgb),
    var(--highlight-background-opacity)
  );
}
</style>

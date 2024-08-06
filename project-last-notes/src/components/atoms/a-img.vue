<script>
export default {
    name: 'AImg',
    render(h) {
        const options = { on: this.$listeners, attrs: this.$attrs }
        return h('img', options)
    },
}
</script>

<style lang="scss" scoped>
img {
    vertical-align: top;
}
</style>

<docs>
## Examples

```jsx
<a-img
    src="https://raw.githubusercontent.com/Akryum/v-tooltip/master/v-tooltip.png"
/>
```
</docs>

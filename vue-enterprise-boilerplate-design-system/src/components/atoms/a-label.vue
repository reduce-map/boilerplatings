<script>
export default {
    name: 'ALabel',
    render(h) {
        const asterisk =
            this.$attrs.required &&
            h('span', { class: this.$style.required }, '*')
        const labelOptions = {
            on: this.$listeners,
            attrs: this.$attrs,
            class: this.$style.label,
        }
        const labelSlots = [this.$slots.default]
        const label = h('label', labelOptions, labelSlots)
        const children = [asterisk, label]
        return h('div', children)
    },
}
</script>

<style lang="scss" module>
.label {
    font-size: 12px;
    font-weight: 600;
    color: #80807e;
    letter-spacing: normal;
}

.required {
    width: 7px;
    height: 17px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    font-stretch: normal;
    line-height: normal;
    color: #e90f00;
    letter-spacing: normal;
}
</style>

<docs>
This label is amazing, use it responsibly.

## Examples

Label usage

```jsx
<a-label
    :for="'example for'"
>
    Example label
</a-label>
```

```jsx
<a-label
    required
    :for="'example for'"
>
    Example required label
</a-label>
```
</docs>

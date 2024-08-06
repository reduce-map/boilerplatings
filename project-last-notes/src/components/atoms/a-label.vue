<template>
    <div>
        <span v-if="isRequired" :class="$style.required"> * </span>

        <label
            class="a-label"
            v-bind="$attrs"
            :class="$style.label"
            v-on="listeners"
        >
            <slot />
        </label>
    </div>
</template>

<script>
export default {
    name: 'ALabel',
    props: {
        required: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        listeners() {
            return {
                ...this.$listeners,
            }
        },
        isRequired() {
            return this.required
        },
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

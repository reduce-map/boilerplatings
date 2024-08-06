<script>
export default {
    name: 'Button',
    props: {
        btnType: {
            type: String,
            required: true,
        },
    },
    render(h) {
        const options = {
            attrs: this.$attrs,
            on: this.$listeners,
            class: this.btnType,
        }
        const slots = [this.$slots.default]
        return h('button', options, slots)
    },
}
</script>

<style lang="scss" scoped>
button {
    outline: none;
}
.submit {
    color: rgb(255, 255, 255);
    background: rgb(244, 66, 66);
}
.link {
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    &:hover {
        border-bottom: 1px solid #444;
    }

    /* border is optional */
}
</style>

<template>
    <div>
        <textarea
            ref="te"
            :value="value"
            class="editable medium-editor-textarea"/>
    </div>
</template>

<script>
import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.css'

export default {
    name: 'TextEditor',
    // prop to save DOM elem
    te: null,
    props: {
        value: {
            type: String,
            required: true
        }
    },
    mounted: function() {
        this.$options.te = new MediumEditor(this.$refs.te, {
            toolbar: {
                buttons: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'quote',
                    'anchor',
                    'image',
                    'justifyLeft',
                    'justifyCenter',
                    'justifyRight',
                    'justifyFull',
                    'superscript',
                    'subscript',
                    'orderedlist',
                    'unorderedlist',
                    'pre',
                    'outdent',
                    'indent',
                    'h2',
                    'h3'
                ],
                sticky: true,
                static: true,
                align: 'left',
                updateOnEmptySelection: true
            }
        })

        this.$options.te.subscribe('editableInput', () => {
            this.$emit('input', this.$options.te.getContent())
        })
    },
    beforeDestroy() {
        this.$options.te.destroy()
    }
}
</script>

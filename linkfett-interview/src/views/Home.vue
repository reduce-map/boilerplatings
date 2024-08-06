<template>
    <div class="home-view">
        <form-add-text />
        <texts-list />
    </div>
</template>

<script>
import FormAddText from '@/components/form_add_text'
import TextsList from '@/components/texts_list'

export default {
    name: 'Home',
    components: {
        FormAddText,
        TextsList,
    },
}
</script>

<template>
    <Crud />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Crud from '@/components/Crud.vue';

export default defineComponent({
    name: 'CrudView',

    components: {
        Crud,
    },
});
</script>
<template>
    <RegistroFormulario />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import RegistroFormulario from '../components/RegistroFormulario.vue';

export default defineComponent({
    name: 'RegistroView',

    components: {
    RegistroFormulario
    },
});
</script>

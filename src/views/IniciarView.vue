<template>
    <LoginFormulario />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import LoginFormulario from '@/components/LoginFormulario.vue';

export default defineComponent({
    name: 'LoginView',

    components: {
        LoginFormulario,
    },
});
</script>

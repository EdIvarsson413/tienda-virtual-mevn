<template>
  <Catalogo />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Catalogo from '@/components/Catalogo.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Catalogo,
  },
});
</script>

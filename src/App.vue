<template>
  <v-app>
    <v-main class="bg-grey-darken-3">
      <Layout />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Layout from '@/components/Layout.vue';

export default {
  name: 'App',

  components:{
    Layout
  },

  data: () => ({
    //
  }),
}
</script>

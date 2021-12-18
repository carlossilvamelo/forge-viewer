<template>
  <v-app>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="24">LOGIN</v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col ali cols="6">
          <ForgeViewer />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ForgeViewer from './components/ForgeViewer';

export default {
  name: 'App',

  components: {
    ForgeViewer,
  },

  data: () => ({
    //
  }),
};
</script>

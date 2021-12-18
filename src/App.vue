<template>
  <!-- <v-app>
    <v-container>
      <v-row align="center" justify="center" v-if="showUpload">
        <v-file-input
          chips
          multiple
          @change="uploadFile"
          label="File(s)"
          v-model="file"
        ></v-file-input>
      </v-row>
      <v-row align="center" justify="center">
        <v-col ali cols="6">
          <ForgeViewer />
        </v-col>
      </v-row>
    </v-container>
  </v-app> -->
  <ForgeViewer />
</template>

<script>
import ForgeViewer from "./components/ForgeViewer";
import {
  uploadFile,
  isAuthenticated,
  authenticateUser,
} from "./components/ForgeViewerServices.js";
export default {
  name: "App",
  components: {
    ForgeViewer,
  },
  async beforeMount() {
    if (!isAuthenticated()) {
      await authenticateUser();
    }
  },
  data: () => ({
    actionString: "/api/forge/datamanagement/bucket/upload",
    file: null,
    showUpload: false
  }),
  methods: {
    async uploadFile(file) {
      console.log(file);
      uploadFile(file);
    },
  },
};
</script>

<template>
  <v-app>
    <v-container>
      <v-row align="center" justify="center">
        <v-file-input
          chips
          multiple
          @change="uploadFile"
          label="File(s)"
          v-model="file"
        ></v-file-input>
        <!-- <p></p>
        <p>Supported formats can be found here:</p>
        <p><a target="_blank" href="https://developer.autodesk.com/en/docs/model-derivative/v2/overview/supported-translations/">https://developer.autodesk.com/en/docs/model-derivative/v2/overview/supported-translations/</a></p>
     -->
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
import ForgeViewer from "./components/ForgeViewer";
import { uploadFile } from "./components/ForgeViewerServices.js";
export default {
  name: "App",
  components: {
    ForgeViewer,
  },

  data: () => ({
    actionString: "/api/forge/datamanagement/bucket/upload",
    file: null,
  }),
  methods: {
    async uploadFile(file) {
      console.log(file);
      uploadFile(file)
    },
  },
};
</script>

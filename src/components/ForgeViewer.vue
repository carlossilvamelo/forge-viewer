<template>
  <v-container :v-if="myToken!= null && urn != null">

    <forge-vuer :getAccessToken="getTokenAsync" :urn="urn" />
  </v-container>
</template>

<script>
import ForgeVuer from "forge-vuer";
import {
    isAuthenticated,
  authenticateUser,
  getToken,
} from "./ForgeViewerServices.js";

export default {
  name: "ForgeViewer",
  components: {
    ForgeVuer,
  },
  data: () => {
    return {
      myToken: null,
      urn: null,
    };
  },
  beforeMount() {
    // var documentId = "urn:" + this.getUrlParameter("urn");
   var documentId = "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXktYnVja2V0L215LWF3ZXNvbWUtZm9yZ2UtZmlsZS5ydnQ"
    console.log("carlos",decodeURIComponent("asdasd"))  
    console.log(documentId);
    this.urn = documentId;
  },
  methods: {
    async getTokenAsync(onSuccess) {
      // An API call to retrieve a valid token should be
      // done here. A backend service might need to be implemented.
      if(!isAuthenticated())
        await authenticateUser();
      const token = getToken();
      // For testing purposes, a valid token can be hardcoded but will
      // last a maximum of 1 hour (3600 seconds.)
      this.myToken = token;
      let expireTimeSeconds = 3599;
      onSuccess(token, expireTimeSeconds);
    },
    /**
     * Get Query string from URL,
     * we will use this to get the value of 'urn' from URL
     */
    getUrlParameter(name) {
    console.log("carlos",decodeURIComponent("asdasd"))
      name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
  },
};
</script>

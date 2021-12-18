<template>

    <div id="ForgeViewer" :v-if="myToken != null && urn != null">
      <forge-vuer :getAccessToken="getTokenAsync" :urn="urn" />
    </div>
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
      urn: "urn:adsk.objects:os.object:rqodjejxqjw7ryc4lzy4offvc0apa4jl_tutorial_bucket/projeto%20simples.rvt",
    };
  },

  methods: {
    async getTokenAsync(onSuccess) {
      // An API call to retrieve a valid token should be
      // done here. A backend service might need to be implemented.
      if (!isAuthenticated()) await authenticateUser();
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
      console.log("carlos", decodeURIComponent("asdasd"));
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

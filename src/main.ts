import "./index.scss";
import "inert-polyfill";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { OpenAPI } from "@/apiClient/core/OpenAPI";
import { VueQueryPlugin, type VueQueryPluginOptions } from "vue-query";
import { ApiError } from "@/apiClient";

OpenAPI.BASE = "/api/timetracking";

if (import.meta.env.MODE === "development") {
  const { worker } = await import("@/mocks/browser");
  worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
    onUnhandledRequest(request) {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api/")) {
        // an unknow /api request was made, log it
        console.error("[MSW] unhandled %s %s", request.method, request.url);
      }
    },
  });
  OpenAPI.BASE = "/api";
}

const onError = (error: any) => {
  if (error.status === 401) {
    window.location.reload();
  } else if (error.status === 403) {
    console.error("You don't have access.");
  } else if (error.status !== 404) {
    if (!(error instanceof ApiError)) {
      console.error("An error has occurred.");
    }
  }
};

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      mutations: {
        onError,
      },
      queries: {
        retry: false,
        // only on prod since on dev we use devtools which also triggers the refetch
        refetchOnWindowFocus: import.meta.env.PROD,
        onError,
      },
    },
  },
};

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.mount("#app");

import type { propertyTyping } from "~/types/property";

export const usePropertyStore = defineStore("propertyStore", {
  state: () => ({
    properties: <propertyTyping[]>[],
  }),
  actions: {
    addProperties(propertyList: propertyTyping[]) {
      this.properties = this.properties.concat(propertyList);
    },
  },
});

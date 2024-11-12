<script setup lang="ts">
import { usePropertyStore } from "@/stores/properties";
import propertyResult from "@/constants/properties.json";
import type { propertyTyping } from "~/types/property";
import PropertyCard from "~/components/property-card.vue";
import PropertyMap from "~/components/property-map.vue";

// Set page meta data
definePageMeta({
  title: "Huispedia",
});

// Add properties to the store
const propertyStore = usePropertyStore();
const propertyData: propertyTyping[] = propertyResult.data;
propertyStore.addProperties(propertyData);
</script>

<template>
  <div class="flex pt-20 justify-center">
    <ClientOnly>
      <PropertyMap
        class="property-map hidden md:block w-[calc(100vw_-_25rem)] xl:w-[calc(100vw_-_50rem)] h-[calc(100vh_-_5rem)]"
      />
    </ClientOnly>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 property-cards overflow-y-auto h-[calc(100vh_-_5rem)]"
    >
      <PropertyCard
        v-for="(property, index) in propertyStore.properties"
        :key="`property-${index}`"
        :property="property"
      />
    </div>
  </div>
</template>

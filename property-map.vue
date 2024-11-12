<script setup lang="ts">
import { usePropertyStore } from "@/stores/properties";
import type { propertyTyping, propertyMarkerTyping } from "~/types/property";

const propertyStore = usePropertyStore();

// Map the properties to objects that can be used as markers
const propertiesAsMarkers: ComputedRef<propertyMarkerTyping[]> = computed(() =>
  propertyStore.properties.flatMap((property: propertyTyping) => {
    // If the property has a lat and long, then create a marker object, otherwise leave it out
    if (property?.attributes?.latitude && property.attributes.longitude) {
      let name: string = "";
      // Get the name of the marker
      if (property?.attributes?.street) {
        name = property.attributes.street;
        if (property?.attributes?.houseNumberFull)
          name += ` ${property.attributes.houseNumberFull}`;
        if (property?.attributes?.city) name += ", ";
      }
      if (property?.attributes?.city) name += property.attributes.city;

      return [
        {
          lat: property.attributes.latitude,
          lng: property.attributes.longitude,
          name,
        },
      ];
    }
    return [];
  })
);

// Get the average lat and long to determine the center
const averagePosition: ComputedRef<[number, number]> = computed(() => {
  // Add all the lat's and lng's together
  const totalPosition = propertiesAsMarkers.value.reduce(
    (accumulator: [number, number], position: propertyMarkerTyping) => {
      accumulator[0] = accumulator[0] + position.lat;
      accumulator[1] = accumulator[1] + position.lng;
      return accumulator;
    },
    [0, 0]
  );
  // Divide by the total
  return [
    totalPosition[0] / propertiesAsMarkers.value.length,
    totalPosition[1] / propertiesAsMarkers.value.length,
  ];
});
</script>

<template>
  <div>
    <LMap
      style="width: 100%; height: 100%"
      :zoom="15"
      :center="averagePosition"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="(marker, index) in propertiesAsMarkers"
        :key="`map-marker-${index}`"
        :lat-lng="[marker.lat, marker.lng]"
      >
        <LPopup>{{ marker.name }}</LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

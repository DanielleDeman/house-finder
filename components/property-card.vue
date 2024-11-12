<script setup lang="ts">
import type { propertyTyping, propertyOfferTyping } from "~/types/property";

const props = defineProps<{
  property: propertyTyping;
}>();

// Create the title of the property base on it's location
const propertyTitle: ComputedRef<string> = computed(() => {
  const attributes = props.property?.attributes;
  const title: string | null =
    attributes && attributes.street && attributes.houseNumberFull
      ? `${attributes.street} ${attributes.houseNumberFull}`
      : null;
  return title ? `${title}, ${attributes.city}` : attributes.city;
});

const offer: ComputedRef<propertyOfferTyping | null> = computed(
  () => props.property?.attributes?.offer ?? null
);
</script>

<template>
  <NuxtLink
    v-if="property"
    :to="property.attributes?.huispediaProfileUrl"
    class="border rounded-lg block"
  >
    <div class="w-full relative bg-slate-200">
      <p
        v-if="offer?.status"
        class="text-sm font-medium bg-slate-50 rounded-lg p-2 absolute top-4 left-4"
      >
        {{ offer.status }}
      </p>
      <img
        v-if="property.attributes?.image?.href"
        :src="property.attributes.image.href"
        loading="lazy"
        class="w-full rounded-t-lg aspect-video"
        alt=""
      />
    </div>
    <div class="p-4">
      <h2 class="text-sm font-bold">{{ propertyTitle }}</h2>
      <template v-if="offer">
        <p v-if="offer.salePrice" class="text-sm">
          Koopprijs: &euro; {{ offer.salePrice }}
        </p>
        <p v-if="offer.rentalPrice" class="text-sm">
          Huurprijs: &euro; {{ offer.rentalPrice }}
        </p>
      </template>
    </div>
  </NuxtLink>
</template>

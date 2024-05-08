<script setup>
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import NavBar from "./components/NavBar/NavBar.vue";
import DeleteModal from "./components/DeleteModal/DeleteModal.vue";
import { usePropertiesStore } from "@/stores/properties";

const storeProperties = usePropertiesStore();

// Define a reactive property to track if data is loaded
const dataLoaded = ref(false);

// Call the fill action when the component is mounted
onMounted(async () => {
  await storeProperties.fill();
  dataLoaded.value = true; // Set dataLoaded to true once data is loaded
});
</script>

<template>
  <NavBar />
  <!-- Adding Suspense component here. So pages can await the data. -->
  <Suspense>
    <template #fallback>Loading...</template>
    <!-- Use v-if to conditionally render components when data is loaded -->
    <RouterView v-if="dataLoaded" />
  </Suspense>
  <!-- Only render DeleteModal when data is loaded -->
  <DeleteModal v-if="dataLoaded && storeProperties.displayDeleteModal" />
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>

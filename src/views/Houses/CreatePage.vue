<template>
  <PageWrapper class="pageWrapperDetails">
    <section class="createHouseDetails">
      <PageHeader pageTitle="Create New Listing" />
      <HouseForm
        :handleSubmit="handleSubmit"
        :values="newHouse"
        buttonText="Submit"
      />
    </section>
  </PageWrapper>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postHouse } from "@/services/api";
import PageWrapper from "@/components/atoms/PageWrapper/PageWrapper.vue";
import PageHeader from "@/components/PageHeader/PageHeader.vue";
import HouseForm from "@/components/HouseForm/HouseForm.vue";

const newHouse = ref({
  location: {
    streetName: "",
    houseNumber: "",
    zip: "",
    city: "",
  },
  numberAddition: "",
  image: "",
  price: "",
  size: "",
  hasGarage: "",
  rooms: {
    bedrooms: "",
    bathrooms: "",
  },
  constructionYear: "",
  description: "",
});

const router = useRouter();

/* for test
async function handleSubmit() {
    const obj = {
  "price": "20",
  "bedrooms": "1",
  "bathrooms": "1",
  "size": "1",
  "streetName": "Overtoom",
  "houseNumber": "21",
  "numberAddition": "A",
  "zip": "1181TY",
  "city": "Amsterdam",
  "constructionYear": "1901",
  "hasGarage": "false",
  "description": "Nice house!"
};
const form = new FormData();
for (const [key, value] of Object.entries(obj)) {
  form.append(key, value);
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "X-Api-Key": import.meta.env.VITE_API_KEY,
  },
});


*/

async function handleSubmit(houseDetails) {
  try {
    // Prepare data for sending (you may need to adjust this according to your backend expectations)
    const formData = prepareFormData(houseDetails);
    const savedHouse = await postHouse(formData);
    console.log(savedHouse);
    router.push({ name: "DETAIL_PAGE", params: { id: savedHouse.id } });
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

// Helper function to convert house details to FormData, as your API might handle file uploads
function prepareFormData(houseDetails) {
  const formData = new FormData();
  Object.keys(houseDetails).forEach((key) => {
    const value = houseDetails[key];
    if (
      value !== null &&
      typeof value === "object" &&
      !(value instanceof File)
    ) {
      Object.keys(value).forEach((subKey) => {
        formData.append(`${key}[${subKey}]`, value[subKey]);
      });
    } else {
      formData.append(key, value);
    }
  });
  return formData;
}
</script>

<style scoped>
.pageWrapperDetails {
  padding-bottom: 64px;
  background-image: url("@/assets/img_background.png");
  background-repeat: no-repeat;
  background-size: 132%;
  background-position: right -100px bottom;
}

.createHouseDetails {
  max-width: 450px;
  margin: auto;
}

@media screen and (min-width: 768px) {
  .createHouseDetails {
    max-width: 500px;
  }
}

@media screen and (min-width: 1024px) {
  .createHouseDetails {
    max-width: 378px;
    margin: 0;
  }

  .pageWrapperDetails {
    background-size: cover;
    background-position: right top;
  }
}
</style>

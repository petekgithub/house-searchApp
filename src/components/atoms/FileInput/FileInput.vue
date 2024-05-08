<template>
  <BaseLabel>{{ label }}</BaseLabel>
  <label
    class="uploadImageContainer"
    :class="{ 'input--error': errors.length > 0 }"
    for="image"
  >
    <span class="imageUploadBlock" v-if="!previewImageUrl">
      <img class="uploadHouseIcon" src="@/assets/upload.png" />
    </span>
    <img
      class="uploadedPreviewImage"
      :src="previewImageUrl"
      v-if="previewImageUrl"
    />
    <img
      class="cancelUploadedImageIcon"
      src="@/assets/clear_white.png"
      v-if="previewImageUrl"
      @click="clearImage"
    />
  </label>
  <TextParagraph
    variant="errorMessage"
    v-for="error in errors"
    :key="error.$uid"
  >
    {{ error.$message }}
  </TextParagraph>
  <input
    id="image"
    type="file"
    ref="file"
    @change="displayPreviewImage"
    hidden
  />
</template>

<script setup>
import BaseLabel from "@/components/atoms/BaseLabel/BaseLabel.vue";
import TextParagraph from "@/components/atoms/Typography/TextParagraph.vue";

defineProps({
  label: String,
  imageFile: {
    type: File,
    default: null,
  },
  previewImageUrl: {
    type: String,
    default: "",
  },
  errors: {
    default: [],
  },
});

//essentially specifying which events this component can trigger.
const emit = defineEmits(["update:previewImageUrl", "update:imageFile"]);

function clearImage(event) {
  // Don't trigger the change event on the input by using preventDefault,
  // otherwise user will be immidiately prompted for another file.
  event.preventDefault();
  // Reset the preview image.
  emit("update:previewImageUrl", "");
  // Reset the value of the file input.
  emit("update:imageFile", null);
}

function displayPreviewImage(event) {
  // If no image was selected, just stop.
  if (!event.target.files[0]) return;
  // Generate preview image.
  const url = URL.createObjectURL(event.target.files[0]);
  // Emit the changes for v-model to update.
  emit("update:previewImageUrl", url);
  emit("update:imageFile", event.target.files[0]);
}
</script>

<style scoped>
.uploadImageContainer {
  position: relative;
  width: 104px;
  /* Adding z-index here. So the label doesn't slide in front of the mobile navbar. */
  z-index: 0;
}

.input--error {
  border: 1px solid var(--primary);
}

.imageUploadBlock {
  display: block;
  background-image: url("@/assets/img_placeholder_house");
  width: 104px;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uploadHouseIcon {
  width: 24px;
}

.uploadedPreviewImage {
  width: 104px;
  height: 104px;
  object-fit: cover;
  object-position: left;
  border-radius: 5px;
}

.cancelUploadedImageIcon {
  position: absolute;
  width: 14px;
  height: 14px;
  right: 0;
  top: 0;
  background-color: rgba(
    53,
    20,
    20,
    0.5
  ); /* Add a semi-transparent white background */
  border-radius: 50%; /* Make the icon circular */
  display: flex;
  justify-content: center;
  align-items: center;
}

.cancelUploadedImageIcon img {
  width: 12px; /* Adjust the size of the icon */
  height: 12px;
}
</style>

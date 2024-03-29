<template>
  <div
    class="page-container"
    @dragenter.prevent="handleDragEnter"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <div class="container mx-auto px-4 py-8">
      <div class="py-8">
        <div class="flex items-center justify-between mb-4 mt-1">
          <h1 class="text-2xl font-bold">Gallery</h1>
          <button
            class="rounded-full bg-custom_green text-black py-2 px-4 md:w-36 md:h-12"
            style="background-color: #72a8ca"
            @click="openFileInput"
          >
            Upload
          </button>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            accept="image/*"
            multiple
            @change="handleFileUpload"
          />
        </div>
      </div>
    </div>
    <hr class="my-0 mx-0 h-0.5 border-t-0 hr-style" />
    <div
      class="container mx-auto px-4 flex flex-wrap justify-between"
      ref="dropArea"
    >
      <div
        class="relative"
        v-for="(image, index) in uploadedImages"
        :key="index"
      >
        <div class="image-container relative">
          <img :src="image" :alt="'Image ' + (index + 1)" class="image" />
          <button
            class="absolute top-0 right-1 bg-gray-500 text-black text-xs p-2 m-2 rounded-full hover:bg-white"
            @click="removeImage(index)"
          >
            x
          </button>
        </div>
      </div>
    </div>
    <div
      class="drop-area container mx-auto px-4 flex flex-wrap justify-between"
      @dragstart.prevent="handleDragStart"
      ref="dropArea"
      v-if="!imagesUploaded"
    >
      Drag & Drop Images Here
    </div>
  </div>
</template>

<script lang="ts">
import Toastify from "toastify-js";

export default {
  data() {
    return {
      uploadedImages: [] as string[],
      imagesUploaded: false,
      loading: false,
    };
  },
  methods: {
    openFileInput(): void {
      const fileInput = this.$refs.fileInput as HTMLInputElement;
      fileInput.click();
    },
    async handleFileUpload(event: Event): Promise<void> {
      const input = event.target as HTMLInputElement;
      if (!input.files) return;

      const files = Array.from(input.files) as File[];

      const validFiles: File[] = [];
      const invalidFiles: File[] = [];
      for (const file of files) {
        if (file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      }

      if (invalidFiles.length > 0) {
        invalidFiles.forEach((file) => {
          this.showToastErrorSize(
            `File '${file.name}' exceeds the maximum size limit of 2MB or is not an image.`,
            "red"
          );
        });
      }

      if (validFiles.length > 0) {
        const base64Files = await Promise.all(
          validFiles.map(async (file) => {
            return await this.readFileAsBase64(file);
          })
        );
        this.uploadImageToServer(base64Files);
      }
    },
    showLoadingToast() {
      this.loading = true;
    },
    showToast(message: string, backgroundColor: string) {
      Toastify({
        text: message,
        backgroundColor: backgroundColor,
        duration: 3000,
        style: {
          color: "white",
          backgroundColor: "#4CAF50",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          textAlign: "center",
          width: "fit-content",
          height: "fit-content",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }).showToast();
    },
    async readFileAsBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = () => {
          reader.abort();
          //reject(new Error("Failed to read file as base64."));
          this.showToast("Failed to read file as base64", "red");
        };
        reader.readAsDataURL(file);
      });
    },
    async uploadImageToServer(base64Image: string[]): Promise<void> {
      this.loading = true;
      this.showToast("Loading...", "grey");

      const validImages: string[] = [];
      const invalidImages: string[] = [];
      for (const image of base64Image) {
        validImages.push(image);
        this.uploadedImages.push(image);
        this.imagesUploaded = true;
      }

      if (validImages.length > 0) {
        try {
          const apiUrl =
            "https://vintrackers.buildonlinestaging.com/upload/images/";
          const response = await fetch(apiUrl, {
            mode: 'no-cors',
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ images: validImages }),
          });
          if (response.status === 200) {
            console.log("test");
            this.loading = false;
            this.showToast("Image uploaded successfully to the API!", "#4CAF50");
          }
        } finally {
          this.showToast("Image uploaded faild to the API!", "red");
          this.loading = false;
        }
      }
      if (invalidImages.length > 0) {
        invalidImages.forEach((image) => {
          this.showToastErrorSize(
            `the '${image}' exceeds the maximum size limit of 2MB or is not an image.`,
            "red"
          );
        });
      }
    },

    removeImage(index: number) {
      try {
        this.uploadedImages.splice(index, 1);
        this.showToastDelete("Image deleted successfully", "#4CAF50");
      } catch (error) {
        this.showToastDelete("Image deleted faild", "red");
      }
    },
    handleDragEnter(event: DragEvent): void {
      event.preventDefault();
      event.dataTransfer!.dropEffect = "copy";
    },
    handleDragOver(event: DragEvent): void {
      event.preventDefault();
      event.dataTransfer!.dropEffect = "copy";
    },
    handleDragLeave(event: DragEvent): void {
      const dropArea = this.$refs.dropArea as HTMLElement | null;
      if (dropArea) {
        dropArea.classList.remove("drag-over");
      }
    },
    handleDragStart(event: DragEvent): void {
      event.preventDefault();
    },
    async handleDrop(event: DragEvent): Promise<void> {
      event.preventDefault();
      const dropArea = this.$refs.dropArea as HTMLElement | null;
      if (dropArea) {
        dropArea.classList.remove("drag-over");
      }

      const files = event.dataTransfer!.files;
      if (!files) return;

      const validFiles: File[] = [];
      const invalidFiles: File[] = [];
      for (const file of files) {
        if (file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      }

      if (invalidFiles.length > 0) {
        invalidFiles.forEach((file) => {
          this.showToastErrorSize(
            `File '${file.name}' exceeds the maximum size limit of 2MB or is not an image.`,
            "red"
          );
        });
      }

      if (validFiles.length > 0) {
        const base64Files = await Promise.all(
          validFiles.map(async (file) => {
            return await this.readFileAsBase64(file);
          })
        );
        this.uploadImageToServer(base64Files);
        this.showLoadingToast();
      }
    },
    showToastErrorSize(message: string, backgroundColor: string) {
      Toastify({
        text: message,
        backgroundColor: backgroundColor,
        duration: 3000,
        style: {
          color: "white",
          backgroundColor: "#4CAF50",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          textAlign: "center",
          width: "fit-content",
          height: "fit-content",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }).showToast();
    },

    showToastDelete(message: string, color: string) {
      Toastify({
        text: message,
        duration: 2000,
        style: {
          color: color,
          backgroundColor: "White",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "2px solid gray",
          textAlign: "center",
          width: "fit-content",
          height: "fit-content",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }).showToast();
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.image-container {
  position: relative;
  flex: 0 0 calc(25% - 20px);
  margin-bottom: 20px;
  margin-right: 10px;
}

.image {
  max-width: 100%;
  height: auto;
}
@media (max-width: 768px) {
  .image-container {
    flex-basis: calc(50% - 20px);
  }
}

.hr-style {
  background-color: #c2bebe;
  margin-top: -70px;
  margin-bottom: 20px;
}
.drop-area {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 200px;
  border: 2px dashed #72a8ca;
  background-color: #f0f4f8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #6b7280;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.drop-area.drag-over {
  background-color: #e5e7eb;
}

.drop-area span {
  pointer-events: none;
}
</style>

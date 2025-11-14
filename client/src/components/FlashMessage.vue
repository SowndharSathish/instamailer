<template>
  <div
    class="fixed z-[1001] max-w-[520px] min-w-[340px] w-auto h-auto p-4 top-16 right-4 rounded-lg shadow-lg border-l-4 flex items-center transition-all duration-300"
    :class="statusClass"
    role="alert"
    tabindex="-1"
  >
    <!-- Icon -->
    <span
      class="inline-flex justify-center items-center size-8 rounded-full border-4 mr-3"
      :class="iconWrapperClass"
    >
      <svg
        v-if="status == 200"
        class="shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        ></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>

      <svg
        v-else
        class="shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </span>

    <!-- Message -->
    <div class="text-left">
      <h3 class="font-semibold text-gray-800 dark:text-white">
        {{ title }}
      </h3>
      <p class="text-sm text-gray-700 dark:text-neutral-300">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlashMessage",
  data() {
    return {};
  },
  props: ["message", "status"],
  computed: {
    statusClass() {
      if (this.status == 200) {
        return "bg-teal-50 border-teal-500 dark:bg-teal-800/30";
      }
      return "bg-red-50 border-red-500 dark:bg-red-800/30";
    },
    iconWrapperClass() {
      if (this.status == 200) {
        return "border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400";
      }
      return "border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400";
    },
    title() {
      return this.status == 200 ? "Successfully updated." : "Error!";
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

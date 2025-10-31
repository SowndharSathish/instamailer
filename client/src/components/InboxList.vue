<template>
  <div class="w-80 border-r border-gray-200 overflow-y-auto bg-white">
    <div v-if="loading" class="text-center text-gray-500 py-6">Loading...</div>

    <ul v-else>
      <li
        v-for="mail in emails"
        :key="mail.id"
        @click="$emit('select-mail', mail)"
        class="border-b border-gray-100 p-4 hover:bg-emerald-50 cursor-pointer"
      >
        <h4 class="font-semibold text-gray-800">{{ mail.subject }}</h4>
        <p class="text-sm text-gray-600">{{ mail.sender }}</p>
        <span class="text-xs text-gray-400">{{ mail.time }}</span>
      </li>
    </ul>

    <div
      v-if="!loading && emails.length === 0"
      class="text-center text-gray-500 py-6"
    >
      No emails found.
    </div>
  </div>
</template>

<script>
export default {
  name: "InboxList",
  props: {
    emails: Array,
    loading: Boolean,
  },
};
</script>

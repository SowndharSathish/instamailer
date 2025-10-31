<template>
  <div class="flex-1 bg-white overflow-y-auto p-6">
    <div v-if="mail" class="space-y-4">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ mail.subject }}
        </h2>
        <p class="text-sm text-gray-500">
          From: <span class="font-mono">{{ mail.sender }}</span>
        </p>
        <span class="text-xs text-gray-400">{{ mail.time }}</span>
      </div>
      <hr />
      <p class="text-gray-700 leading-relaxed whitespace-pre-line">
        {{ mail.body }}
      </p>
    </div>

    <div v-else class="h-full flex items-center justify-center text-gray-500">
      Select an email to read
    </div>
  </div>
</template>

<script>
export default {
  name: "MailReader",
  props: {
    mail: Object,
  },
};
</script>

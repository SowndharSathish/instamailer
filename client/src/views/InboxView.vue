<template>
  <div class="h-screen w-screen flex bg-gray-50 overflow-hidden">
    <!-- Sidebar -->
    <div class="flex flex-col bg-[#064EA4] text-white w-80 flex-shrink-0">
      <SideNav @email-generated="onEmailGenerated" />
    </div>

    <!-- Main Section -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Top Navigation -->
      <div class="flex-shrink-0">
        <TopNav :showNav="true" />
      </div>

      <!-- Inbox Layout -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Inbox List -->
        <aside class="w-80 border-r border-gray-200 overflow-y-auto bg-white">
          <div class="p-4 font-semibold text-gray-700 border-b border-gray-200">
            Inbox
          </div>
          <ul>
            <li
              v-for="email in emails"
              :key="email.id"
              @click="selectEmail(email)"
              :class="[
                'cursor-pointer px-4 py-3 border-b hover:bg-gray-100',
                selectedEmail && selectedEmail.id === email.id
                  ? 'bg-gray-100 font-medium'
                  : '',
              ]"
            >
              <div class="flex justify-between">
                <span class="truncate">{{ email.senderName }}</span>
                <span class="text-xs text-gray-400">{{ email.time }}</span>
              </div>
              <div class="text-sm text-gray-600 truncate">
                {{ email.subject }}
              </div>
            </li>
          </ul>
        </aside>

        <!-- Email Content Area -->
        <section class="flex-1 overflow-y-auto bg-gray-50">
          <div v-if="selectedEmail" class="p-6">
            <!-- Header Section -->
            <div class="bg-white shadow-sm rounded-lg border border-gray-200">
              <div class="flex justify-between items-start p-6 border-b">
                <div>
                  <h2 class="text-lg font-semibold text-gray-800">
                    {{ selectedEmail.subject }}
                  </h2>
                  <p class="text-sm text-gray-500 mt-1">
                    From: {{ selectedEmail.senderName }} &lt;{{
                      selectedEmail.senderEmail
                    }}&gt;
                  </p>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-4 text-gray-500">
                  <button
                    v-for="action in actions"
                    :key="action.label"
                    @click="handleAction(action.label)"
                    class="flex items-center gap-1 hover:text-blue-600 transition"
                  >
                    <i :class="action.icon + ' text-lg'"></i>
                    <span class="hidden sm:inline text-sm">{{
                      action.label
                    }}</span>
                  </button>
                </div>
              </div>

              <!-- Timestamp -->
              <div
                class="flex items-center justify-between bg-gray-100 px-6 py-2 text-sm text-gray-600 border-b"
              >
                <div class="flex items-center gap-2">
                  <i class="ri-calendar-line text-gray-500"></i>
                  {{ selectedEmail.date }}
                </div>
                <div class="flex items-center gap-2">
                  <i class="ri-shield-check-line text-green-500"></i>
                  Deliverability Verified
                </div>
              </div>

              <!-- Email Body -->
              <div class="p-8 bg-white">
                <!-- Logo -->
                <div v-if="selectedEmail.logo" class="flex justify-center mb-6">
                  <img :src="selectedEmail.logo" alt="Logo" class="h-14" />
                </div>

                <!-- Email Content -->
                <div
                  class="text-gray-700 leading-relaxed mb-6"
                  v-html="selectedEmail.body"
                ></div>

                <!-- Refund Table -->
                <div
                  v-if="selectedEmail.refundDetails"
                  class="overflow-x-auto mt-6"
                >
                  <table class="min-w-full border border-gray-200 text-sm">
                    <thead class="bg-gray-100 text-gray-800">
                      <tr>
                        <th class="px-4 py-2 border text-left">Order No</th>
                        <th class="px-4 py-2 border text-left">Date</th>
                        <th class="px-4 py-2 border text-left">Student</th>
                        <th class="px-4 py-2 border text-left">
                          Refunded Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-4 py-2 border">
                          {{ selectedEmail.refundDetails.orderNo }}
                        </td>
                        <td class="px-4 py-2 border">
                          {{ selectedEmail.refundDetails.date }}
                        </td>
                        <td class="px-4 py-2 border">
                          {{ selectedEmail.refundDetails.student }}
                        </td>
                        <td
                          class="px-4 py-2 border font-semibold text-emerald-600"
                        >
                          {{ selectedEmail.refundDetails.amount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Footer -->
                <div class="mt-8 text-sm text-gray-600 border-t pt-4">
                  <p>
                    Have any questions? Try our
                    <a href="#" class="text-blue-600 hover:underline">FAQs</a>
                    or
                    <a href="#" class="text-blue-600 hover:underline"
                      >Contact Us</a
                    >. We would love to hear from you!
                  </p>
                  <p class="mt-4 text-gray-500">
                    ABN 42 161 276 624 Trading as Smart Schools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- No Email Selected -->
          <div
            v-else
            class="flex items-center justify-center h-full text-gray-400 text-lg"
          >
            Select an email to read
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import SideNav from "@/components/SideNav.vue";

export default {
  name: "InboxView",
  components: { TopNav, SideNav },
  data() {
    return {
      emails: [
        {
          id: 1,
          senderName: "Smart Schools",
          senderEmail: "no-reply@smartschools.com.au",
          subject: "Refund Processed for Order #1023",
          time: "6:13 PM",
          date: "Friday, October 31, 2025 6:13:34 PM",
          logo: "/smart-schools-logo.png",
          body: `
            <p>Hi Test,</p>
            <p>We've refunded <strong>$102.00</strong> to your Smart Schools account. It’s already there and ready to use on your next order.</p>
          `,
          refundDetails: {
            orderNo: "1023",
            date: "31/10/2025",
            student: "AStudent1 User1",
            amount: "$102.00",
          },
        },
        {
          id: 2,
          senderName: "Smart Schools Support",
          senderEmail: "support@smartschools.com.au",
          subject: "Payment Confirmation - Order #2041",
          time: "4:40 PM",
          date: "Thursday, October 30, 2025 4:40:12 PM",
          logo: "/smart-schools-logo.png",
          body: `
            <p>Hi John,</p>
            <p>Your payment of <strong>$56.00</strong> has been received successfully for your Smart Schools order.</p>
          `,
        },
      ],
      selectedEmail: null,
      actions: [
        { label: "Reply", icon: "ri-reply-line" },
        { label: "Forward", icon: "ri-share-forward-line" },
        { label: "Delete", icon: "ri-delete-bin-line" },
        { label: "Print", icon: "ri-printer-line" },
      ],
    };
  },
  methods: {
    selectEmail(email) {
      this.selectedEmail = email;
    },
    onEmailGenerated(email) {
      console.log("Email generated:", email);
    },
    handleAction(action) {
      alert(`${action} clicked!`);
    },
  },
};
</script>

<style scoped>
aside ul {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

aside ul::-webkit-scrollbar {
  width: 8px;
}

aside ul::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
</style>

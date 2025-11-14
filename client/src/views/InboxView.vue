<template>
  <div class="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
    <!-- Top Navigation (always visible on mobile) -->
    <div class="flex-shrink-0 z-20 shadow-sm bg-white">
      <TopNav
        :showNav="true"
        @toggle-sidebar="mobileSidebarOpen = !mobileSidebarOpen"
      />
    </div>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar (Hidden on mobile, Slide-in) -->
      <transition name="slide">
        <div
          v-if="mobileSidebarOpen"
          class="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          @click="mobileSidebarOpen = false"
        ></div>
      </transition>

      <transition name="slide-left">
        <aside
          class="fixed top-0 left-0 h-full w-72 z-40 bg-[#064EA4] text-white flex flex-col shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 md:w-80 md:flex-shrink-0"
          :class="
            mobileSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          "
        >
          <SideNav @email-generated="onEmailGenerated" />
        </aside>
      </transition>

      <!-- Main Inbox + Email area -->
      <div class="flex flex-1 overflow-hidden flex-col md:flex-row">
        <!-- Inbox List -->
        <aside
          class="w-full md:w-80 border-r border-gray-200 bg-white overflow-y-auto h-1/2 md:h-auto"
        >
          <div class="p-4 font-semibold text-gray-700 border-b">Inbox</div>

          <ul>
            <li
              v-for="email in emails"
              :key="email.id"
              @click="selectEmail(email)"
              class="cursor-pointer px-4 py-3 border-b hover:bg-gray-100"
              :class="
                selectedEmail?.id === email.id ? 'bg-gray-100 font-medium' : ''
              "
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

        <!-- Email Content -->
        <section class="flex-1 overflow-y-auto bg-gray-50 h-1/2 md:h-auto">
          <div v-if="selectedEmail" class="p-4 md:p-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <!-- Header -->
              <div
                class="flex flex-col md:flex-row md:justify-between md:items-start p-4 md:p-6 border-b gap-3"
              >
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

                <!-- Actions -->
                <div
                  class="flex items-center gap-4 text-gray-500 md:flex-row flex-wrap"
                >
                  <button
                    v-for="action in actions"
                    :key="action.label"
                    @click="handleAction(action.label)"
                    class="flex items-center gap-2 hover:text-blue-600 transition text-sm md:text-md"
                  >
                    <i :class="action.icon + ' text-lg'"></i>
                    <span class="hidden sm:inline">{{ action.label }}</span>
                  </button>
                </div>
              </div>

              <!-- Timestamp -->
              <div
                class="flex justify-between items-center bg-gray-100 px-4 md:px-6 py-2 text-sm text-gray-600 border-b"
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

              <!-- Body -->
              <div class="p-5 md:p-8 bg-white">
                <div v-if="selectedEmail.logo" class="flex justify-center mb-6">
                  <img :src="selectedEmail.logo" class="h-12 md:h-14" />
                </div>

                <div
                  v-html="selectedEmail.body"
                  class="text-gray-700 leading-relaxed mb-6"
                ></div>

                <!-- Refund Table -->
                <div
                  v-if="selectedEmail.refundDetails"
                  class="overflow-x-auto mt-6"
                >
                  <table class="min-w-full border text-sm">
                    <thead class="bg-gray-100">
                      <tr>
                        <th class="px-3 py-2 border text-left">Order No</th>
                        <th class="px-3 py-2 border text-left">Date</th>
                        <th class="px-3 py-2 border text-left">Student</th>
                        <th class="px-3 py-2 border text-left">Refund Amt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="px-3 py-2 border">
                          {{ selectedEmail.refundDetails.orderNo }}
                        </td>
                        <td class="px-3 py-2 border">
                          {{ selectedEmail.refundDetails.date }}
                        </td>
                        <td class="px-3 py-2 border">
                          {{ selectedEmail.refundDetails.student }}
                        </td>
                        <td
                          class="px-3 py-2 border text-emerald-600 font-semibold"
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
                    Have questions? Try our
                    <a href="#" class="text-blue-600">FAQs</a>
                    or
                    <a href="#" class="text-blue-600">Contact Us</a>.
                  </p>
                  <p class="mt-4 text-gray-500">
                    ABN 42 161 276 624 Trading as Smart Schools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- No email selected -->
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

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>

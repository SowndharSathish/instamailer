<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Inbox view -->
    <div class="flex flex-col h-screen">
      <TopNav :email="generatedEmail" @logout="logout" />

      <div class="flex flex-1 overflow-hidden">
        <SideNav />
        <div class="flex flex-1 overflow-hidden">
          <InboxList
            :emails="emails"
            :loading="loading"
            @select-mail="selectedMail = $event"
          />
          <MailReader :mail="selectedMail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import SideNav from "@/components/SideNav.vue";
import InboxList from "@/components/InboxList.vue";
import MailReader from "@/components/MailReader.vue";

export default {
  name: "HomeView",
  components: {
    TopNav,
    SideNav,
    InboxList,
    MailReader,
  },
  data() {
    return {
      customEmail: "",
      generatedEmail: "",
      emails: [],
      selectedMail: null,
      loading: false,
    };
  },
  methods: {
    generateEmail() {
      const domain = "dummymail.com";
      const namePart =
        this.customEmail.trim() || "user" + Math.floor(Math.random() * 10000);
      this.generatedEmail = `${namePart}@${domain}`;
      this.fetchInbox();
    },
    async fetchInbox() {
      this.loading = true;
      // Simulated API call
      setTimeout(() => {
        this.emails = [
          {
            id: 1,
            subject: "Welcome to DummyMail!",
            sender: "support@dummymail.com",
            time: "Just now",
            body: "Thanks for using DummyMail! This is a sample message.",
          },
          {
            id: 2,
            subject: "Your temporary inbox is active",
            sender: "noreply@dummymail.com",
            time: "2 mins ago",
            body: "You can now receive messages on your dummy email address.",
          },
        ];
        this.selectedMail = this.emails[0];
        this.loading = false;
      }, 1000);
    },
    logout() {
      this.generatedEmail = "";
      this.customEmail = "";
      this.emails = [];
      this.selectedMail = null;
    },
  },
};
</script>

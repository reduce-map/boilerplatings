<template>
  <div class="sign-out-container">
    <p>Signing you out...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
// import axios from 'axios'; // Make sure axios is installed

const router = useRouter();

const signOut = async () => {
  try {
    // Make an API call to sign out
    // await axios.post('/api/auth/signout');
    authStore.signOut();
    // Redirect to the login page after successful sign out
    await router.push({ name: 'sign-in' });
  } catch (error) {
    console.error('Failed to sign out:', error);
    // Handle the error, e.g., show a notification or redirect to an error page
  }
};

onMounted(() => {
  signOut();
});
</script>

<style scoped>
.sign-out-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

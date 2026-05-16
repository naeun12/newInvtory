<!-- @format -->

<template>
  <div
    class="auth-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
    <div class="card auth-card shadow-lg border-0 p-4 m-3">
      <div class="card-body">
        <div class="logo-wrapper text-center mb-4">
          <img
            src="/images/misologo.jpg"
            alt="MISO Logo"
            class="auth-logo mb-2" />
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label fw-semibold text-secondary"
              >Email address</label
            >
            <input
              type="text"
              id="email"
              class="form-control form-control-lg"
              placeholder="name@example.com"
              v-model="auth.email"
              required />
          </div>
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label
                for="password"
                class="form-label fw-semibold text-secondary mb-0"
                >Password</label
              >
              <label class="show-password-wrapper">
                <input
                  type="checkbox"
                  id="togglePassword"
                  class="d-none"
                  onclick="togglePasswordVisibility()" />
                <span class="show-password-text text-primary fw-semibold"
                  >Show Password</span
                >
              </label>
            </div>
            <input
              type="password"
              id="password"
              class="form-control form-control-lg"
              placeholder="••••••••"
              v-model="auth.password"
              required />
          </div>
          <button type="submit" class="btn login-button">Login</button>
        </form>
        <div class="text-center mt-3">
          <p class="text-muted mb-0">
            <a
              href="#"
              class="text-primary fw-bold text-decoration-none ms-1 link-hover">
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
      isShowPassword: false,
      errors: {},
    };
  },

  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await axios.post(
          "https://localhost:5001/api/user/auth",
          {
            Username: this.auth.email,
            Password: this.auth.password,
          },
        );
        localStorage.setItem("token", response.data.data.token);
        this.$router.push({ name: "Dashboard" });
      } catch (error) {
        if (error.response) {
          this.error =
            error.response.data.error ||
            error.response.data.message ||
            "Invalid username or password";
        } else {
          this.error = "Server not reachable.";
        }
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {},
};
</script>
<style src="../../assets/stylesheets/Login.css"></style>

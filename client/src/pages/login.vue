<template lang="pug">
  v-content
    v-container.fill-height(fluid='')
      v-row(align='center' justify='center')
        v-col(cols='12' sm='8' md='4')
          v-card.elevation-12
            v-toolbar(color='primary' dark='' flat='')
              v-toolbar-title Login form
              v-spacer
            v-card-text
              //- p isAuthenticatePending: {{isAuthenticatePending}}
              //- v-progress-linear(
              //-   v-if="isAuthenticatePending"
              //-   indeterminate
              //-   color="green"
              //- )
              //- v-progress-circular(
              //-   v-if="isAuthenticatePending"
              //-   :size="70"
              //-   :width="7"
              //-   color="green"
              //-   indeterminate
              //- )
              v-form
                v-text-field(
                  v-model='email'
                  :error-messages='emailErrors'
                  label='E-mail'
                  @input='$v.email.$touch()'
                  @blur='$v.email.$touch()'
                  prepend-icon='mdi-account'
                )
                v-text-field#password(
                  v-model="password"
                  label='Password'
                  name='password'
                  prepend-icon='mdi-lock'
                  :type="isShowPassword ? 'text' : 'password'"
                  :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="isShowPassword = !isShowPassword"
                )
            v-card-actions
              v-btn(text small color="primary" to="/signup") Registration
              v-spacer
              v-btn(
                color="success"
                @click.prevent="login"
                :loading="isLoginProcess"
                :disabled="isLoginProcess"
              ) Login




</template>

<script>
import { mapState, mapActions } from "vuex";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "auth",
  mixins: [validationMixin],
  components: {},
  data: () => ({
    email: "t1@m.ru",
    password: "123123",
    isShowPassword: false,
    isLoginProcess: false
  }),
  validations: {
    email: { required, email }
  },
  computed: {
    ...mapState("auth", {
      isAuthenticatePending: "isAuthenticatePending"
    }),
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");

      this.$v.email.$invalid &&
        !errors.length &&
        errors.push("Not described error. Please write to support.");

      return errors;
    }
  },
  methods: {
    ...mapActions({
      authenticate: "auth/authenticate"
    }),

    //  ...mapActions('auth', { authLogout: 'logout' }),

    async login() {
      try {
        this.isLoginProcess = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.isLoginProcess = false;
          return;
        }
        const { email, password } = this;
        await this.authenticate({ strategy: "local", email, password });
        this.$router.push("/");
      } catch (error) {
        this.isLoginProcess = false;
        console.error("error: ", error);
      }
    }
  }
};
</script>

<style>
</style>


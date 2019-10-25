<template lang="pug">
   v-content
    v-container.fill-height(fluid='')
      v-row(align='center' justify='center')
        v-col(cols='12' sm='8' md='4')
          v-card.elevation-12
            v-toolbar(color='primary' dark='' flat='')
              v-toolbar-title Signup form
              v-spacer
            v-card-text

              v-form
                v-text-field(
                  v-model='email'
                  :error-messages='emailErrors'
                  label='E-mail'
                  @input='$v.email.$touch()'
                  @blur='$v.email.$touch()'
                )

                v-text-field(
                  v-model='password'
                  :error-messages='passwordErrors'
                  label='Password'
                  @input='$v.password.$touch()'
                  @blur='$v.password.$touch()'
                )

                v-text-field(
                  v-model='password2'
                  :error-messages='password2Errors'
                  label='Password confirm'
                  @input='$v.password2.$touch()'
                  @blur='$v.password2.$touch()'
                )

            v-card-actions
              v-spacer
              v-btn.mr-4(
                @click = 'signUp'
              ) signUp

</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'signup',
  mixins: [validationMixin],
  components: {},
  data: () => ({
    email: 't1@m.ru',
    password: '123123',
    password2: '123124'
  }),
  validations: {
    email: { required, email },

    // TODO passwords validations
    password: {
      required
      //  TODO check is good password +displayed password quality in percent
      // goodPassword: password => {
      //   // a custom validator!
      //   return (
      //     password.length >= 8 &&
      //     /[a-z]/.test(password) &&
      //     /[A-Z]/.test(password) &&
      //     /[0-9]/.test(password)
      //   );
      // }
    },
    password2: {
      required: required,
      sameAs: sameAs('password')
    }
  },
  computed: {
    user() {
      const { email, password } = this;
      return { email, password };
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');

      this.$v.email.$invalid &&
        !errors.length &&
        errors.push('Not described error. Please write to support.');

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');

      this.$v.password.$invalid &&
        !errors.length &&
        errors.push('not described error');

      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      !this.$v.password2.required &&
        errors.push('Password confirm is required');
      !this.$v.password2.sameAs && errors.push('Passwords must match.');

      this.$v.password2.$invalid &&
        !errors.length &&
        errors.push('not described error');

      return errors;
    }
  },
  methods: {
    async signUp() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const { User } = this.$FeathersVuex.api;

      const user = new User(this.user);
      user.save().then(user => {
        console.log(user);
        debugger;
        this.$router.push('/login');
      });
    }
  }
};
</script>

import { makeAuthPlugin } from './FeathersVuex';

export default makeAuthPlugin({
  userService: 'users', // Specify the userService to automatically populate the user upon login.
  entityIdField: '_id', // The property in the payload storing the user id
  responseEntityField: 'user', // The property in the payload storing the user,
  errorOnAuthenticate: error => {
    console.error('errorOnAuthenticate:', error);
  }
});

import feathersVuex from 'feathers-vuex';

import feathersClient from '../feathers-client';

// Setting up feathers-vuex how in docs
// const {
//   FeathersVuex,
//   makeServicePlugin,
//   makeAuthPlugin,
//   BaseModel,
//   models
// } = feathersVuex(feathersClient, {
//   serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
//   idField: '_id', // Must match the id field in your database table/collection
//   whitelist: ['$regex', '$options']
// });

// export { FeathersVuex, makeAuthPlugin, makeServicePlugin, BaseModel, models };

// Setting up feathers-vuex
const {
  FeathersVuex,
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models
} = feathersVuex(feathersClient, {
  serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
  idField: '_id', // Must match the id field in your database table/collection
  whitelist: ['$regex', '$options']
});

export default FeathersVuex;
export { makeAuthPlugin, makeServicePlugin, BaseModel, models };

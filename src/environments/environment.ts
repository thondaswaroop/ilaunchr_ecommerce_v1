// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  appTitle: 'ilaunchr',
  appLoginSessionID: 'ilaunchr_ecommerce_id',
  appOrderRandom: 'ilaunchr_ecommerce_orderrand',
  forceLogin: false,
  offline: false,
  currency: 'USD ',
  developer: 'iLaunchr, Inc. USA',
  developerURL: 'https://www.ilaunchr.com',
  version: '0.0.1',
  business_type: '1', //0=Delivery , 1=Pickup
  apiURL: '/api/api.php?action='
  // apiURL: 'https://ilaunchrapp.com/demo_ecom/api/api.php?action='
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

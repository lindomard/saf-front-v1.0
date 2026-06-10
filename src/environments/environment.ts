/*
git bash
set NODE_OPTIONS=--openssl-legacy-provider
export NODE_OPTIONS=--openssl-legacy-provider
*/

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//http://191.252.2.65:8080/saf-core/swagger-ui/index.html#/
//swagger
export const environment = {
  production: false,

/*
  urlInicio: 'http://192.168.15.7:7879/',  
  urlImagem: 'http://192.168.15.7:7879/saf-core/',
  url: 'http://192.168.15.7:7879/saf-core/',
*/

  urlInicio: 'http://localhost:8080',
  urlImagem: 'http://localhost:8080/',
  url: 'http://localhost:8080/',
  
//  url: 'http://191.252.2.65:8080/saf-core/',
  basic: 'Basic Z2VuZXNpc19wal9nZWg6Z2VuZXNpc19wal9nZWg=',
  isCompanyId: true,
  tokenInvalido: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJTZW0gTG9nYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwib3JnYW5pemF0aW9uIjoiaW50ZXJzeXMuZ2VzdG9yLnByb2pldG9zLWNvcmUiLCJleHAiOjE3MDY3MDk4NjksImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiIxMGRhNjI2Ni0zMWMzLTRkZmMtYWIzMi04ZGZmMjRiNmEzMmIiLCJEQl9DT05GSUciOnsidXNlcm5hbWVMb2dnZWQiOiJTZW0gTG9nYXIiLCJyZWdpc3RlckRiVXJsIjoiamRiYzpvcmFjbGU6dGhpbjpAbG9jYWxob3N0OjE1MjEvT1JDTERFWkciLCJyZWdpc3RlckRiVXNlcm5hbWUiOiJHRVNUT1JfUFJPSkVUT1MiLCJyZWdpc3RlckRiUGFzc3dvcmQiOiJERVpFTk9WRSIsIm1vdkRiVXJsIjoidWVsIHRlc3RlIiwibW92RGJVc2VybmFtZSI6bnVsbCwibW92RGJQYXNzd29yZCI6bnVsbCwibmZlRGJVcmwiOm51bGwsIm5mZURiVXNlcm5hbWUiOm51bGwsIm5mZURiUGFzc3dvcmQiOm51bGwsImV2ZW50c0RiVXJsIjpudWxsLCJldmVudHNEYlVzZXJuYW1lIjpudWxsLCJldmVudHNEYlBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZURiTWFzdGVyIjoiR0VTVE9SX1BST0pFVE9TIiwidXNlcm5hbWVEYkRldGFsaGUiOiJHRVNUT1JfUFJPSkVUT1MiLCJ1c2VySWQiOm51bGwsImNvbXBhbnlJZCI6MH0sImNsaWVudF9pZCI6ImdlbmVzaXNfcGpfZ2VoIn0.801sQ3FWsTl2bkelsSwcPtNSMf0Mu1tTqUWzQSxALoE'
  // url: 'https://69.162.124.34:8135/resources-0.0.1-SNAPSHOT/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

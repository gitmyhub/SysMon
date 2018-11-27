// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    wsdl: 'http://eccdev.desidea.com:8001/sap/bc/srt/wsdl/flv_10002A111AD1/bndg_url/desidea/soap/license_server?sap-client=800',
    licenseHost: 'https://eccdev.desidea.com:5201/desidea/soap/license_server',//'http://requestbin.fullcontact.com/1h4itdf1//'//'https://webhook.site/4210ad7c-d189-4941-8a54-e47817a46492',
    userId: 'SMFISERVICE',
    password: 'Work4DesIDEA',
    CONSUMER_KEY : 'someReallyStupidTextWhichWeHumansCantRead', 
    codes: [ 'AB', 'AC', 'XYZ' ],
};
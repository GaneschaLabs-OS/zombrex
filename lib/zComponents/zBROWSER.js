export default zBROWSER = {
   languageLong: window.navigator.userLanguage || window.navigator.language,
   language: (window.navigator.userLanguage || window.navigator.language).substring(0, 2),
   agent: navigator.userAgent,
   online: navigator.onLine,
   timeFormat: new Date().getTimezoneOffset()
};

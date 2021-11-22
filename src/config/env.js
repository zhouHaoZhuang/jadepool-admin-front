let VUE_APP_BASE_URL = "";

if (process.env.VUE_APP_ENV === "dev") {
  VUE_APP_BASE_URL = 'https://api.chadian.com';
} else if (process.env.VUE_APP_ENV === "test") {
  VUE_APP_BASE_URL = "http://api-test.com";
} else if (process.env.VUE_APP_ENV === "prod") {
  VUE_APP_BASE_URL = 'https://api.chadian.com';
}

export default {
  VUE_APP_BASE_URL
};

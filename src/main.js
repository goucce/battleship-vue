// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCUH-oeZZzMRmtpoh3avJFj7XjmIqrkEbw",
  authDomain: "battleship-dc82b.firebaseapp.com",
  databaseURL: "https://battleship-dc82b.firebaseio.com",
  projectId: "battleship-dc82b",
  storageBucket: "battleship-dc82b.appspot.com",
  messagingSenderId: "969087220479"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user ){
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
});


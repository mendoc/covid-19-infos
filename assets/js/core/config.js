// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCzhY0dmY8aGzpm7wkcyCZSKTA4fDim7Ls",
    authDomain: "covid-19-infos.firebaseapp.com",
    databaseURL: "https://covid-19-infos.firebaseio.com",
    projectId: "covid-19-infos",
    storageBucket: "covid-19-infos.appspot.com",
    messagingSenderId: "143259310420",
    appId: "1:143259310420:web:db7163e2b3734d9f3250c1",
    measurementId: "G-31PYM74466"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

moment.locale('fr_FR');

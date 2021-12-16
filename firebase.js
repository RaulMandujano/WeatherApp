// Import the functions you need from the SDKs you need
// TODO: ADD SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrdUpwg4Dar5ylLRvu8vtZFMrVm-sGkh8",
  authDomain: "weather-app-raulmandujano.firebaseapp.com",
  databaseURL: "https://weather-app-raulmandujano-default-rtdb.firebaseio.com",
  projectId: "weather-app-raulmandujano",
  storageBucket: "weather-app-raulmandujano.appspot.com",
  messagingSenderId: "110281065887",
  appId: "1:110281065887:web:2bb56d4c176a05001129aa",
  measurementId: "G-VD74KE4YW5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

const readCities = async () => {

        return querySnapshot = await db.collection("cities").get();

       
}

const saveCities = async (cityN) => { 
        try{
            const cityRef = await db.collection("cities").add({
                cityName  : cityN
            })
            console.log("Document added " , cityRef.id)
        }catch(e) { 
            console.error( "Error adding document : ", e);
        }
}

const deleteCities = async (city) => { 
    db.collection("cities").doc(city).delete()
}
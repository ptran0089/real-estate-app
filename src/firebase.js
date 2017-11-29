import Firebase from 'firebase';

const config = {
	apiKey: "AIzaSyAdl4janu7gFqfx_z6Lz2BpDlBbt5ZZ4r0",
	authDomain: "real-estate-phuong-tran.firebaseapp.com",
   databaseURL: "https://real-estate-phuong-tran.firebaseio.com"
 };

const firebase = Firebase.initializeApp(config);

export default firebase;
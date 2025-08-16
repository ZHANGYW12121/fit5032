// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// 🔧 添加认证相关的导入
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDk2ecCH80xQFBfqOl88wwpn2CeG6pFlaM',
  authDomain: 'week7-yiwenzhang.firebaseapp.com',
  projectId: 'week7-yiwenzhang',
  storageBucket: 'week7-yiwenzhang.firebasestorage.app',
  messagingSenderId: '481829231389',
  appId: '1:481829231389:web:e70aa78492fb7151459ff4'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const db = getFirestore(app)
const auth = getAuth(app)

// Export the services
export default db
export { auth }

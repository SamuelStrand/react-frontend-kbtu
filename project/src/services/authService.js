import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function signupWithEmailPassword(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(
    doc(db, 'profiles', cred.user.uid),
    {
      email,
      photoURL: cred.user.photoURL ?? null,
      createdAt: Date.now(),
    },
    { merge: true }
  )
  return cred.user
}

export async function loginWithEmailPassword(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export function logout() {
  return signOut(auth)
}

export async function getProfile(uid) {
  const snap = await getDoc(doc(db, 'profiles', uid))
  return snap.exists() ? snap.data() : null
}

export async function saveProfilePhoto(uid, photoURL) {
  await setDoc(doc(db, 'profiles', uid), { photoURL }, { merge: true })
}

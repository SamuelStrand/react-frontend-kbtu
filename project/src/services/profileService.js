import { storage } from './firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { saveProfilePhoto } from './authService'

export async function uploadProfileImage(uid, file) {
  const storageRef = ref(storage, `profilePictures/${uid}.jpg`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  await saveProfilePhoto(uid, url)
  return url
}

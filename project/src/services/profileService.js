import { saveProfilePhoto } from './authService'

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function uploadProfileImage(uid, blob) {
  const dataUrl = await blobToDataUrl(blob)
  await saveProfilePhoto(uid, dataUrl)
  return dataUrl
}

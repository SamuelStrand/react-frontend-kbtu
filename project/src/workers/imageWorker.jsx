self.onmessage = async (event) => {
  const file = event.data
  try {
    const bitmap = await createImageBitmap(file)
    const maxSize = 256
    const scale = Math.min(maxSize / bitmap.width, maxSize / bitmap.height, 1)
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = new OffscreenCanvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(bitmap, 0, 0, width, height)
    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 })

    self.postMessage({ ok: true, blob })
  } catch (e) {
    self.postMessage({ ok: false, error: e.message })
  }
}

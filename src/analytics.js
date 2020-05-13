/* eslint-disable no-undef */
import hash from 'object-hash'

export default {
  logEvent(category, action, label, userId = null) {
    const isTrackingDisabled = localStorage.getItem('ga-tracking-disabled')

    if (isTrackingDisabled === '1') {
      return
    }

    const sessionId = hash(userId)

    dataLayer.push({
      appEventCategory: category,
      appEventAction: action,
      appEventLabel: label,
      sessionId: sessionId
    })

    dataLayer.push({ event: 'appEvent' })
  },

  logPage(path, name, userId = null) {
    const isTrackingDisabled = localStorage.getItem('ga-tracking-disabled')

    if (isTrackingDisabled === '1') {
      return
    }

    let sessionId

    if (!userId) {
      const persistedSessionId = localStorage.getItem('session-id')

      if (!persistedSessionId) {
        const newSessionId = `${Date.now()}.${Math.random() * (1000000 - 1) + 1}`
        localStorage.setItem('session-id', newSessionId)
        sessionId = newSessionId
      } else {
        sessionId = persistedSessionId
      }
    } else {
      sessionId = hash(userId)
    }

    dataLayer.push({
      screenPath: path,
      screenName: name,
      sessionId: sessionId
    })
    dataLayer.push({ event: 'appScreenView' })
  }
}

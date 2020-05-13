/* eslint-disable no-undef */

export default {
  logEvent(category, action, label, sessionId = null) {
    dataLayer.push({
      appEventCategory: category,
      appEventAction: action,
      appEventLabel: label,
      sessionId: sessionId
    })
    dataLayer.push({ event: 'appEvent' })
  },

  logPage(path, name, sessionId = null) {
    dataLayer.push({
      screenPath: path,
      screenName: name,
      sessionId: sessionId
    })
    dataLayer.push({ event: 'appScreenView' })
  }
}

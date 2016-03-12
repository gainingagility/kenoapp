import graph from 'fb-react-sdk'
import ErrorHandler from './ErrorHandler.js'

export function getUserInfo (userName, userId, accessToken) {
  graph.setAccessToken(accessToken)
  graph.setVersion('2.5')
  return new Promise((resolve, reject) => {
    const params = { fields: 'invitable_friends, picture' }
    graph.get(userId, params, (error, res) => {
      if (error !== 'null') {
        const facebookUserObject = {
          'name': userName,
          'userId': userId,
          'friends': res.invitable_friends.data,
          'picture': res.picture.data.url
        }
        resolve(facebookUserObject)
      } else {
        ErrorHandler(error)
      }
    })
  })
}

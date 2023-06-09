const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const { AdminPanelSettings } = require('@mui/icons-material');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.linkCreated = functions.firestore.document("users/{userId}/links/{link}").onCreate((snapshot, context)=>{
    const {userId, link} = context.params
    const {longUrl, shortLink} = snapshot.data();
    // console.log(context);

    const linkRef = admin.firestore().doc(`links/${shortLink}`);
  const linkData = { userId, link, longUrl };

  return linkRef.set(linkData)
    .then(() => {
      console.log(`Document ${shortLink} created in the links collection.`);
      return null;
    })
    .catch((error) => {
      console.error(`Error creating document ${shortLink} in the links collection:`, error);
      return null;
    });
})

exports.linkDeleted = functions.firestore.document("users/{userId}/links/{link}").onDelete((snapshot, context)=>{
  const {userId, link} = context.params
  const {longUrl, shortLink} = snapshot.data();

  const linkRef = admin.firestore().doc(`links/${shortLink}`);
// const linkData = { userId, link, longUrl };

return linkRef.delete()
  .then(() => {
    console.log(`Document ${shortLink} deleted in the links collection.`);
    return null;
  })
  .catch((error) => {
    console.error(`Error deleting document ${shortLink} in the links collection:`, error);
    return null;
  });
})


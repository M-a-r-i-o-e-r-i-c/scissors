const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const {logger}= require('firebase-functions');
const {onRequest} = require('firebase-functions/v2/https');
const {onDocumentCreated} = require('firebase-functions/v2/firestore');
const {getFirestore} = require('firebase-admin/firestore');


// exports.makeUppercase = onDocumentCreated("users/{userId}/links/{link}", (event)=>{
//   const original = event.data.data().original;

//   logger.log("Uppercasing", event.params.link, original)

//   const uppercase = original.toUpperCase();

//   return event.data.ref.set({uppercase}, {merge:true});
// })




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


const functions = require('firebase-functions');
const admin = require('firebase-admin/app');
admin.initializeApp();


exports.linkCreated = functions.firestore.document("users/{userId}/links/{link}").onCreate(async (snapshot, context)=>{
  //   const {userId, link} = context.params
  //   const {longUrl, shortLink} = snapshot.data();
  //   console.log(context);

  // const linkRef = admin.firestore().doc(`links/${shortLink}`);
  // const linkData = { userId, link, longUrl };

  // try {
  //   await linkRef.set(linkData);
  //   console.log(`Document ${shortLink} created in the links collection.`);
  //   return null;
  // } catch (error) {
  //   console.error(`Error creating document ${shortLink} in the links collection:`, error);
  //   return null;
  // }
  console.log("I am hit")
})

exports.linkDeleted = functions.firestore.document("users/{userId}/links/{link}").onDelete(async (snapshot, context)=>{
  // const {userId, link} = context.params
  // const {longUrl, shortLink} = snapshot.data();
  // console.log(context.params)

//   const linkRef = admin.firestore().doc(`links/${shortLink}`);
// // const linkData = { userId, link, longUrl };

//   try {
//     await linkRef.delete();
//     console.log(`Document ${shortLink} deleted in the links collection.`);
//     return null;
//   } catch (error) {
//     console.error(`Error deleting document ${shortLink} in the links collection:`, error);
//     return null;
//   }
})


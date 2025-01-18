function checkPathExists(db, path) {
  return new Promise((resolve, reject) => {
    db.ref(path).once('value', (snapshot) => {
      resolve(snapshot.exists());
    }, (error) => {
      reject(error);
    });
  });
}

async function fetchData(db, path) {
  if (await checkPathExists(db, path)) {
    const snapshot = await db.ref(path).once('value');
    return snapshot.val();
  } else {
    console.error(`Path ${path} does not exist`);
    return null; // or throw an error
  }
}
// ...rest of your code using fetchData
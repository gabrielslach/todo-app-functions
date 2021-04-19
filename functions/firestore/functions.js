const writeData = (db, data = {}) => new Promise((resolve,reject) => {
        try {
            db.collection('hotlist')
            .doc('tasks')
            .set(data)
            .then(docRef => {
                resolve(docRef.id)
            });
        } catch(e) {
            console.log(e);
            reject();
        };
});

const getDoc = (db)=> new Promise((resolve, reject) => {
    db.collection('hotlist')
        .doc('tasks')
        .get()
        .then(querySnapshot => {
            resolve(querySnapshot.data());
            })
        .catch(e=>reject(e))
});


module.exports = {
    writeData,
    getDoc,
}
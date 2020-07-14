const dbPromised = idb.open("dbsoccerpedia", 1, (upgradeDb) => {
  upgradeDb.createObjectStore("clubs", {
    keyPath: "id",
  });
});

const saveForLater = (data) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("clubs", `readwrite`);
        transaction.objectStore("clubs").put(data);
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          resolve(true);
          M.toast({
            html: `Club have been saved.`,
          });
        } else {
          reject(new Error(transaction.onerror));
        }
      })
      .catch((error) => {
        console.log("Failed saving match");
        M.toast({
          html: `Failed saving match`,
        });
      });
  });
};
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("clubs", `readonly`);
        return transaction.objectStore("clubs").getAll();
      })
      .then((data) => {
        if (data !== undefined) {
          console.log("Saved club have been loaded");
          resolve(data);
        } else {
          reject(new Error("Can't load data"));
        }
      })
      .catch((error) => {
        M.toast({
          html: `Failed loading`,
        });
      });
  });
};
const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("clubs", "readonly");
        let store = tx.objectStore("clubs");
        return store.get(parseInt(id));
      })
      .then((clubs) => {
        console.log(`club with id (${id}) have been loaded`);
        resolve(clubs);
      })
      .catch((error) => {
        console.log(`Failed loading club with id ${id}`);
        M.toast({
          html: `Failed loading club with id ${id}`,
        });
        reject(error);
      });
  });
};

const deleteForSaved = (data) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("clubs", `readwrite`);
        transaction.objectStore("clubs").delete(Number(data.id));
        console.log(Number(data.id));
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          console.log("Club have been deleted. ");
          M.toast({
            html: `Club have been deleted.`,
            completeCallback: () => {
              location.href = "/#saved";
            },
          });
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      })
      .catch((error) => {
        console.log(`Failed deleting club with data.club.id (${Number(data)})`);
        M.toast({
          html: `Failed deleting club with data.club.id (${Number(data)})`,
        });
      });
  });
};

export default {
  saveForLater,
  getAll,
  getById,
  deleteForSaved,
};

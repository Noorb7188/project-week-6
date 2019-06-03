

const addUserToDatabase = (email, password, cb) => {
  const database = db.get("data") || []
  const newItem = { email, password }
  const updatedDatabase = database.concat(newItem)
  db.set({ data: updatedDatabase })
  cb(null, true)
}

const getUserFromDatabase = (email, cb) => {
  const database = db.get("data")
  const user = database.find(user => user.email === email)
  const password = user ? user.password : undefined
  cb(null, password)
}

module.exports = {
  getUserFromDatabase,
  addUserToDatabase
}

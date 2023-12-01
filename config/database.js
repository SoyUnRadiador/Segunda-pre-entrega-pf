const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://tomas:N7nYgWBBYk2hvi8@cluster0.zy2qq6q.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error de conexión a MongoDB Atlas:', error);
  }
}

module.exports = connectToDatabase;
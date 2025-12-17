import mongoose from '../conexion.js'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    favoriteGenre: {
        type: String,
        required: true,
    },
})

export default mongoose.model('User', schema)
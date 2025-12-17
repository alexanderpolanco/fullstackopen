import mongoose from '../conexion.js'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
})

export default mongoose.model('Author', schema)
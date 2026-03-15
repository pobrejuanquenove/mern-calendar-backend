const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        // "Le dice" a mongoose que va ser una referencia
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

// Sobrescribo el método toJSON para que el párametro
// _id (es la forma de que serializa Mongoose por defecto) sea id.
// Además. elminamos la __v (version) ya que no nos interesa.
// Usamos una funcion y no una arrow porque necesitamos el this
// a éste objeto
// Sólo afecta a como lo vemos, no en la BD
EventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Event', EventSchema)
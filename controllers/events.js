// para no perder el intellisense!
const { response } = require('express');
const Event = require('../models/Events');

const getEvents = async (req, res = response) => {

    const eventList = await Event.find().populate('user', 'name');

    try {
        return res.status(201).json({
            "ok": true,
            "msg": 'Get events',
            eventList
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "ok": false,
            "msg": ""
        })
    }
}

const createEvent = async (req, res = response) => {

    const eventCreation = new Event(req.body);

    try {

        eventCreation.user = req.uuid;

        const savedEvent = await eventCreation.save();

        return res.status(201).json({
            "ok": true,
            "nmg": "createEvent",
            savedEvent
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "ok": false,
            "msg": "Por favor hable con el administrdor"
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventID = req.params.id;
    const uuid = req.uuid;

    try {

        const event = await Event.findById(eventID);

        if (!event) {
            return res.status(404).json({
                "ok": false,
                "nmg": "El evento no existe"
            })
        }

        if (event.user.toString() !== uuid) {
            return res.status(401).json({
                "ok": false,
                "nmg": "No tiene permisos para editar este evento"
            })
        }

        const updateEventWithThis = {
            ...req.body,
            user: uuid
        }

        // El parámetro new: true se pasa para obtener la última versión de lo insertado,
        // por defecto Mongoose devuelve la anterior para realizar
        const updatedEvent = await Event.findByIdAndUpdate(eventID, updateEventWithThis, { new: true })

        return res.status(201).json({
            "ok": true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "ok": false,
            "msg": "Por favor hable con el administrdor"
        })
    }
}
const deleteEvent = async (req, res = response) => {

    const eventID = req.params.id;
    const uuid = req.uuid;

    try {

        const event = await Event.findById(eventID);

        if (!event) {
            return res.status(404).json({
                "ok": false,
                "nmg": "El evento no existe"
            })
        }

        if (event.user.toString() !== uuid) {
            return res.status(401).json({
                "ok": false,
                "nmg": "No tiene permisos para eliminar este evento"
            })
        }


        // El parámetro new: true se pasa para obtener la última versión de lo insertado,
        // por defecto Mongoose devuelve la anterior para realizar
        const deletedEvent = await Event.findByIdAndDelete(eventID)

        return res.status(201).json({
            "ok": true,
            "event": deleteEvent
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "ok": false,
            "msg": "Por favor hable con el administrdor"
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
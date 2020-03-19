import {Router} from 'express';
import multer from 'multer';
import {getPets, getPetsByID, postPets, getPetsBreed} from '../Controller/pets';
import {getLocationCoordinates, getLocationWeather} from '../Controller/location';

export const petsRouter = Router();

var inMemoryStorage = multer.memoryStorage();
var inMemoryUpload = multer({storage: inMemoryStorage});

petsRouter.get('/pets', getPets);

petsRouter.get('/pets/:id', getPetsByID);

petsRouter.post('/pets', inMemoryUpload.single('attachment'), postPets)

petsRouter.get('/petsBreed', getPetsBreed)

petsRouter.get('/location', getLocationCoordinates)

petsRouter.get('/locationWeather', getLocationWeather)
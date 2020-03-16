import {Router} from 'express';
import multer from 'multer';
import {getPets, getPetsByID, postPets} from '../Controller/pets';

export const petsRouter = Router();

var inMemoryStorage = multer.memoryStorage();
var inMemoryUpload = multer({storage: inMemoryStorage});

petsRouter.get('/pets', getPets);

petsRouter.get('/pets/:id', getPetsByID);

petsRouter.post('/pets', inMemoryUpload.single('attachment'), postPets)
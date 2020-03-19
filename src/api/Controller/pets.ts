import {Request, Response, Errback} from 'express';
import {PetRepository} from '../Data/Repository/petRepository';
import {uploadData} from '../Util/uploadData';


export const getPets = async (req: Request, res: Response) => {

    const repo = new PetRepository();
    
    const pet_list = await repo.getPets();

    res.status(200).send(pet_list);
}

export const getPetsByID = async (req: Request, res: Response) => {
    const repo = new PetRepository();

    const pet_list = await repo.getPetsByID(req.params.id)

    res.status(200).send(pet_list)
}

export const postPets = async (req: Request, res: Response) => {
    let filename: string = req.body.name;

    var fileURL = await uploadData(req.file, filename);
    
    const repo = new PetRepository();
    await repo.postPets(req, fileURL);

    res.status(200).send('Pet saved successfully')
}

export const getPetsBreed = async (req: Request, res: Response) => {
    let petType = req.query.type;

    const repo = new PetRepository();

    const breed_list = await repo.getPetBreed(petType);

    res.status(200).send(breed_list);

}
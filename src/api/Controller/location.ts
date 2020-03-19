import {Request, Response, Errback} from 'express';
import {LocationRepository} from '../Data/Repository/locationRepository';

export const getLocationCoordinates = async (req: Request, res: Response) => {
    const location = req.query.location;

    const repo = new LocationRepository();
    const coordinates = await repo.getLocationCoordinates(location);

    res.status(200).send(coordinates);
}

export const getLocationWeather = async (req: Request, res: Response) => {
    const lat = req.query.lat;
    const lng = req.query.lng;

    const repo = new LocationRepository();

    const weather = await repo.getLocationWeather(lat, lng);

    res.status(200).send(weather);


}
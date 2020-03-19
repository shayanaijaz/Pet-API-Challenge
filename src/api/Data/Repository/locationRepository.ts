require('dotenv').config();
import axios from 'axios';

export class LocationRepository {

    async getLocationCoordinates (location: string) {
        let response: any = [];

        response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                'q': location,
                'pretty': 1,
                'key': process.env.OPENCAGE_API_KEY
            }
        });

        return response.data.results[0].geometry;
    }

    async getLocationWeather (lat: number, lng: number) {
        let response: any = [];

        let api_key = process.env.DARKSKY_API_KEY;

        response = await axios.get(`https://api.darksky.net/forecast/${api_key}/${lat},${lng}`, {
            params: {
                units: 'ca'
            }
        });

        return response.data.currently
    }
}
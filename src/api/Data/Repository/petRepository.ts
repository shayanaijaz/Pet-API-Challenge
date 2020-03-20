require('dotenv').config();
import axios from 'axios';


const {Client} = require('pg')

const client = new Client({
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    host: process.env.POSTGRES_DB_HOSTNAME,
    database: process.env.POSTGRES_DB_DATABASE,
    port: process.env.POSTGRES_DB_PORT
})

export class PetRepository
{
    async getPets()
    {
        client.connect();

        var result;

        try {
            result = await client.query('SELECT * from public.pets')
            console.log(result.rows)
            await client.end()
        }
        catch (err){
            console.log(err.stack)
        }

        return result.rows;        
    }

    async getPetsByID(id: string)
    {
        client.connect();

        const values = [id];

        var result;

        try {
            result = await client.query('SELECT * FROM public.pets WHERE "ID" = $1', values)
            console.log(result.rows)
            await client.end()
        }
        catch (err) {
            console.log(err.stack)
        }

        return result.rows;
    }

    async postPets(data: any, fileURL: any)
    {
        const name: string = data.body.name;
        const type: string = data.body.type;
        const breed: string = data.body.breed;
        let latitude: number = data.body.latitude;
        let longitude: number = data.body.longitude;

        client.connect();

        const queryString: string = 'INSERT INTO public.pets( ' +
            '"name", "type", "breed", "latitude", "longitude", "image") ' +
            'VALUES ($1, $2, $3, $4, $5, $6)';

        const values = [name, type, breed, latitude, longitude, fileURL];

        var result = [];

        try {
            result = await client.query(queryString, values);
            return (result)
            await client.end()
        }
        catch (err) {
            console.log(err.stack)
            return(result)
        }
    }

    async getPetBreed(type: string) {
        let response: any = [];

        try {

            if (type === "dog") {
                response = await axios.get('https://api.thedogapi.com/v1/breeds', {
                    headers: {
                        'x-api-key': process.env.DOG_API_KEY
                    }
                })  
            }
            else if (type === "cat") {
                response = await axios.get('https://api.thecatapi.com/v1/breeds', {
                    headers: {
                        'x-api-key': process.env.CAT_API_KEY
                    }
                }) 
            }

            return response.data;

        } catch (err) {
            console.log(err)
        }
    }
}
require('dotenv').config();


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
            '"Name", "Type", "Breed", "Latitude", "Longitude", "Image") ' +
            'VALUES ($1, $2, $3, $4, $5, $6)';

        const values = [name, type, breed, latitude, longitude, fileURL];

        var result;

        try {
            result = await client.query(queryString, values);
            console.log(result)
        }
        catch (err) {
            console.log(err.stack)
        }

    }
}
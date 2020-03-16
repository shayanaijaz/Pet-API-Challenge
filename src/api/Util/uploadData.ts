import S3 from 'aws-sdk/clients/s3';

export async function uploadData(file: any, filename: string)
{
    const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const params = {
        Bucket: 'pets-images-test',
        Key: filename, // File name you want to save as in S3
        Body: file.buffer,    
        ContentType: file.mimetype,   
        ACL: 'public-read'
    };

    try {
        var result: any = await s3.upload(params).promise()
        console.log(`File uploaded successfully. ${result.Location}`);
        return result.Location;
    }
    catch (err) {
        console.log(err)
    }
}
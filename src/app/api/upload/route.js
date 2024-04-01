import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import uniqid from "uniqid"

export async function POST(req) {
    const data = await req.formData()
    if(data.get('file')) {
        console.log('Uploading file: ', data.get('file'))
        const file = data.get('file')

        const s3Client = new S3Client({
            region: 'us-east-2', // S3 Bucket -> Properties Tab AWS Region
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        })

        const ext = file.name.split('.').slice(-1)[0] // First index of array of letters in filename
        const newFileName = uniqid() + '.' + ext

        const chunks = []
        for await (const chunk of file.stream()) {
            chunks.push(chunk)
        }

        const buffer = Buffer.concat(chunks)
        
        const bucket = 'next-foodorder'
        await s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: buffer
        }))
        
        return Response.json('https://' + bucket + '.s3.amazonaws.com/' + newFileName)
    }
    return Response.json(true)
}
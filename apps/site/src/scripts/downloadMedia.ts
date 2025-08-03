import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pipe = promisify(pipeline)

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET!,
  },
})

const bucket = process.env.S3_BUCKET
const outDir = path.resolve(__dirname, '../../out/mediaFiles')

/**
 * Helper for copying uploaded media into the static site.
 */
async function downloadMedia() {
  fs.mkdirSync(outDir, { recursive: true })

  // Get bucket contents
  const mediaList = await client.send(new ListObjectsV2Command({
    Bucket: bucket,
  }))

  if (!mediaList.Contents) return

  // Download each object
  for (const media of mediaList.Contents) {
    const filename = media.Key!
    const filePath = path.join(outDir, filename)

    const { Body } = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: filename }))

    const writeStream = fs.createWriteStream(filePath)
    await pipe(Body as NodeJS.ReadableStream, writeStream)

    console.log(`Downloaded: ${filename}`)
  }
}

downloadMedia().catch(e => {
  console.error('Media sync failed:', e)
  process.exit(1)
})

import { Router } from "itty-router";

const router = Router()

router.get("/", async (request) => {

	const { upload } = request.query

	if (!upload) {
		return new Response(null)
	}

	const response = await fetch(upload)

	const contentType = response.headers.get('content-type')

	const fileData = await response.arrayBuffer()

	const uniqueFilename = crypto.randomUUID()

	// const file = new File([fileData], uniqueFilename, { type: contentType })

	// BUCKET.put
	// const file = new File([fileData], uniqueFilename, { type: contentType })
	await BUCKET.put(uniqueFilename, fileData, { httpMetadata: { type: contentType, contentType } })





	// 	const get = await BUCKET.put(uniqueFilename, fileData, { httpMetadata: { type, contentType } })



	







	return new Response("Hello World!")
})

export default {
	fetch: router.handle
}
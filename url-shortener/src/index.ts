interface Environment {
	shortener: KVNamespace
}

const upload = async (data: string, env: Environment) => {

	const slug = Math.random().toString(36).substring(2, 8);

	let newurl: URL;

	try {
		newurl = new URL(data)
	}
	catch (error) {
		return new Response(`Invalid URL: ${data}`, { status: 400 });
	}

	if (newurl.hostname === 'localhost' || newurl.hostname === '127.0.0.1') {
		return new Response(`Cannot redirect to localhost`, { status: 400 });
	}

	try {
		await env.shortener.put(slug, newurl.href);
		return new Response(`Successfully created shortlink: ${slug}`, { status: 201 });
	}
	catch (error) {
		return new Response(`Error: ${error}`, { status: 500 });
	}

}

const handleRequest = async (request: Request, env: Environment): Promise<Response> => {

	const slug = request.url.split('/').pop();

	if (request.method === 'GET') {

		if (!slug) {
			return Response.redirect("https://seanvelasco.com", 301);
		}

		const targeturl = await env.shortener.get(slug);

		if (targeturl) {
			return Response.redirect(targeturl, 302);
		}

		const { searchParams } = new URL(request.url)

		const queryParams = searchParams.get('shorten')

		if (queryParams) {
			return upload(queryParams, env)
		}

		return new Response(`${slug} not found`, { status: 404 });
	}

	if (request.method === 'POST' || request.method === 'PUT') {

		let targetUrl

		const contentType = request.headers.get('content-type')

		if (contentType === 'application/json') {
			const { url } = await request.json()
			targetUrl = url
		}

		if (contentType === 'plain/text') {
			targetUrl = await request.text()
		}

		return upload(targetUrl, env);
	}

	if (request.method === 'DELETE') {

		if (!slug) {
			return Response.redirect("https://seanvelasco.com", 301);
		}

		try {
			await env.shortener.delete(slug);
			return new Response(`Successfully deleted shortlink: ${slug}`, { status: 200 });
		}
		catch (error) {
			return new Response(`Error: ${error}`, { status: 500 });
		}
	}

	return new Response('Method not implemented', { status: 501 });
}

export default {
	async fetch(request: Request, env: Environment): Promise<Response> {
		return handleRequest(request, env);
	}
}
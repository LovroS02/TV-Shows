export async function fetcher<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	let data;

	try {
		const authorizationHeader = JSON.parse(localStorage.getItem('authorization-header') || '');

		const response = await fetch(input, {
			headers: {
				'Content-type': 'application/json',
				Accept: 'applicaton/json',
				client: authorizationHeader.client,
				'access-token': authorizationHeader.accessToken,
				uid: authorizationHeader.uid,
			},
			...init,
		});

		const noContent = response.status === 204;

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		if (!noContent) {
			data = await response.json();
		}
	} catch (error) {
		throw new Error(`Response status: ${error}`);
	}

	return data;
}

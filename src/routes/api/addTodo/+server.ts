import { json } from '@sveltejs/kit';
import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from '$env/static/private'
const db = createPool({ connectionString: POSTGRES_URL })

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { message } = await request.json();
        await db.query(`insert into Todo (name, done) values ('${message}', false)`);
	return json("Ok");
}
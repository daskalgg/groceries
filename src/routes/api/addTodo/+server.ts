import { json } from '@sveltejs/kit';
import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from '$env/static/private'
const db = createPool({ connectionString: POSTGRES_URL })

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { text } = await request.json();
        let res = await db.query(`insert into Todo (name, done) values ('${text}', false) RETURNING id`);
	return json(res.rows[0]);
}
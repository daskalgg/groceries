import {json} from '@sveltejs/kit'
import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from '$env/static/private'
const db = createPool({ connectionString: POSTGRES_URL })

/** @type {import('./$types').RequestHandler} */
export async function GET() {

   const res = await db.query('select * from Todo');

    const responseBody = {
        status: 'success',
        todos: res.rows
    };
    return json(responseBody);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({request}) {
    const id = (await request.json()).id;
    console.log(id);
    const res = await db.query(`DELETE from Todo where id = ${id}`);

    const responseBody = {
        status: 'success',
        todos: res.rows
    };
    return json(responseBody);
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { text } = await request.json();
        let res = await db.query(`insert into Todo (name, done) values ('${text}', false) RETURNING id`);
	return json(res.rows[0]);
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const {id, isChangeText, data} = await request.json();
    let res;
    if(isChangeText) {
        res = await db.query(`UPDATE Todo SET name = '${data}' WHERE id = ${id}`);
    } else {
        res = await db.query(`UPDATE Todo SET done = ${data} WHERE id = ${id}`);
    }
	return json(res.rows[0]);
}

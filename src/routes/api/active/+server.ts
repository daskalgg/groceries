import {json} from '@sveltejs/kit'
import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from '$env/static/private'
const db = createPool({ connectionString: POSTGRES_URL })

export async function GET() {

    let res = await db.query('select * from Todo where done is false');

    const responseBody = {
        status: 'success',
        todos: res.rows
    };
    return json(responseBody);
}

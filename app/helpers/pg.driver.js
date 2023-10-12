import pg from "pg";

const client = new pg.Client();

await client.connect();

export default client;

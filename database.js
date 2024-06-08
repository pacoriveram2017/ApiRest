import pg from 'pg';

const {Pool} = pg;
const pool = new Pool({
    connectionString: 'postgres://default:8matYwXoO4jy@ep-delicate-dust-a4xkgqzj.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
});

const conectar = () => {
    pool.connect()
    .then(() =>{
        console.log("Conectado a la base de datos")
    })
    .catch((err) => {
        console.log("Error al conectar a la base de datos: ", err)
    })
};

export default conectar;
export {pool}

 import{ Pool } from 'pg'

export const pool = new Pool({
    host: 'ec2-44-206-197-71.compute-1.amazonaws.com',
    user: 'thogfbfudlvnvf',
    password: '9056a073700f988820fd6ceb9a815ac0e095d0ff1cd607bf9a15578e3dcd2e2e',
    port: 5432,
    database: 'dcsq3ai2pq6ds',
    ssl:{
        require: true,
        rejectUnauthorized:false,
    }
});

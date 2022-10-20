const path = require('path');
const { engine } = require('express-handlebars');
const SortMiddleWare = require('./app/middleware/SortMiddleware')


const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
var methodOverride = require('method-override')
const route = require('./routes');
const db = require('./config/db');
// Connection to db 
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'))
//Custom middleware 
app.use(SortMiddleWare)
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers : {
            sum : (a,b) => a + b,
            sortable: (field,sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default :'IconSortDf',
                    asc : 'IconSortAsc',
                    desc : 'IconSortDesc'
                }
                const types = {
                    default: 'desc',
                    asc :'desc',
                    desc : 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]
                return   `
                        <a href="?_sort&column=${field}&type=${type}">
                        <span>${icon}</span>
                        </a>
                        `
                
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource','views'));
// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

const app = require('./app');
const { PORT } = require('./config');

app.listen(3000, () => {
    console.log('app on port 3000');
})

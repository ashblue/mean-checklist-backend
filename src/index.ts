import app from './app/app';

const PORT = process.env.PORT || 3000;

app.express.listen(PORT, (err) => {
    if (err) {
        return console.error(err);
    }

    return console.log(`Server is listening on ${PORT}`);
});

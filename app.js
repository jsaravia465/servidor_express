import express from 'express';
import fs from 'fs';


const app = express();

let cantItem = 0;
let cantItems = 0;


const server = app.listen(8080, () => { console.log(`Servidor levantado correctamente en puerto ${server.address().port}`) });

server.on('error', err => { console.log(`Error en servidor :  ${err} `) });

let archivo = 'productos.txt';

async function getProductos(archivo) {

    try {
        const contenido = await fs.promises.readFile(archivo, 'utf-8');

        return JSON.parse(contenido);
    } catch (e) {

        console.log(e);
    }


}

let randomEnteros = (min, max) => {
    return Math.floor(Math.random() * ((max + 1) - min) + min);

}



app.get('/items', (req, res, next) => {
    cantItems += 1;
    getProductos(archivo).then(arr => {
        res.send(JSON.stringify({ items: arr, cantidad: arr.length }));
    })
});


app.get('/item-random', (req, res, next) => {

    cantItem += 1;

    getProductos(archivo).then(arr => {
        let i = randomEnteros(0, arr.length - 1);

        res.send(JSON.stringify({ item: arr[i] }));
    })


});


app.get('/visitas', (req, res, next) => {

    res.send({ items: cantItems, item: cantItem });
});

app.get('/', (req, res, next) => {

    res.send('Ruta incorrecta. Solo puede acceder a  /items o /item-random o /visitas');
});
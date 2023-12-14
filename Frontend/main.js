/*
estructura del json a usar de la api




id
title
price
description
category
image
rating{
    rate
    count
}

tipos de categorias
electronics=electronica
jewelery=joyeria
men's clothing=ropa de hombre
women's clothing=ropa de mujer
*/
const imgElect=document.getElementById("elect-img-id");
const imgMen=document.getElementById("men-img-id");
const imgWomen=document.getElementById("women-img-id");
const imgJewelery=document.getElementById("jew-img-id");

const listaJoyas=document.getElementById("lista-joyas");

const listaRopaH=document.getElementById("lista-ropaH");
const listaRopaM=document.getElementById("lista-ropaM");



let joyas=[];
let electronica=[];
let ropaH=[];
let ropaM=[];
///productos/categoria/jewelery
//http://127.0.0.1:5000/productos/categoria/jewelery
fetch("http://127.0.0.1:5000/productos/categoria/jewelery")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        joyas=data;
        imgJewelery.src=joyas[0].image;
        console.log(joyas);
    });
//http://127.0.0.1:5000/productos/categoria/electronics
fetch("http://127.0.0.1:5000/productos/categoria/electronics")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        electronica=data;
        imgElect.src=electronica[0].image;
        console.log(electronica);
    })
//http://127.0.0.1:5000/productos/categoria/men's clothing
fetch("http://127.0.0.1:5000/productos/categoria/men's clothing")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        ropaH=data;
        imgMen.src=ropaH[1].image;
        console.log(ropaH);
    })
//http://127.0.0.1:5000/productos/categoria/women's clothing
fetch("http://127.0.0.1:5000/productos/categoria/women's clothing")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        ropaM=data;
        imgWomen.src=ropaM[0].image;
        console.log(ropaM);
    })














'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

const overlay = select('.overlay');
const loader = select('.loader');

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbG1hLWRldiIsImEiOiJjbGJncnJqc2wwaXhjM29xd2liMXYzbmE4In0.c2LzFGTr8v0YUQlSfSe3mQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    interractive: false,
    center: [0, 0],
    pitch: 40,
    zoom: 16
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
    color: '#3898ff'
})

function getLocation(position) {
    const { longitude, latitude } = position.coords;

    if(longitude && latitude) {
        map.setCenter([longitude, latitude]);
        marker.setLngLat([longitude, latitude]).addTo(map);
        setTimeout(() => { overlay.style.display = 'none'}, 750);
        loader.style.display = 'none';
    }
}

function errorHandler(event) {
    loader.style.animationPlayState = 'paused';
    console.log(event.message);
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 0       // To always get the users location at each step
}

/*
    The watchPosition() method is used to register a handler function that will 
    be called automatically each time the position of the device changes
*/

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
} else {
    console.log('Geolocation is not supported by your browser');
}

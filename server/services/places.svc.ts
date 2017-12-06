import axios from 'axios';
import {models} from '../models/models.d';

let googleMapsClient = require('@google/maps').createClient({
    key: `${process.env.GOOGLE_WEB_SERVICES_KEY}`,
    Promise: Promise
})


export function getCoords(query: any): Promise<any> {

    console.log(query)
    return googleMapsClient.geocode({
        address: query.address
    }).asPromise()
    .then((response: any) => {
        console.log(response.json.results[0].geometry.location);
        query.lat = response.json.results[0].geometry.location.lat;
        query.lng = response.json.results[0].geometry.location.lng;
        console.log(query);
        return hasCoords(query);
    })
    .catch((error: any) => {
        console.log(error);
    });

};

export function hasCoords(query: any): Promise<Array<any>> {

    console.log(query);

    let convertedKeywords = convert(query.keywords);
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+query.lat+","+query.lng+"&radius="+query.radius+"&type="+query.type+convertedKeywords+"&opennow=true&key="+process.env.GOOGLE_PLACES_KEY;

    console.log(url);

    return axios.get(url)
    .then(results => {
        console.log(results.data.results);
        return getArrayDetails(results.data.results.map((element: any) => {
            return element.place_id;
        }));
    })
    .catch(error => {
        console.log(error);
    })


}

function convert(keywords: Array<string>) {
    if (keywords.length > 0) {
        let gKeywords = "&keyword=";

        for (let i = 0; i < keywords.length; i++) {
            if (i === keywords.length - 1) {
                gKeywords += keywords[i];
            } else {
                gKeywords += `${keywords[i]},`
            }
        }

        return gKeywords;

    } else {
        return '';
    }
};

function getArrayDetails(places: Array<string>): Promise<any> {

    console.log(places);

    let promiseList = places.map(element => {
        return getPlaceDetails(element);
    });

    return Promise.all(promiseList)
    .then(values => {
        return values;
    })
}

function getPlaceDetails(placeId: string): Promise<any> {


    const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key="+process.env.GOOGLE_PLACES_KEY;

    return axios.get(url)
    .then(response => {
        console.log(response.data.result);
        let placeDetail = {
            place_id: response.data.result.place_id,
            name: response.data.result.name,
            url: response.data.result.url,
            website: response.data.result.website,
            address: response.data.result.formatted_address,
            lat: response.data.result.geometry.location.lat,
            lng: response.data.result.geometry.location.lng,
            rating: response.data.result.rating,
            photos: response.data.result.photos
        }
        return placeDetail;
    })
    .catch(error => {
        console.log(error);
    })
};

export function getImage(reference: string): Promise<any> {
    const url = "https://maps.googleapis.com/maps/api/place/photo?key="+process.env.GOOGLE_PLACES_KEY+"&maxheight=1600&photoreference="+reference

    return axios.get(url)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
}

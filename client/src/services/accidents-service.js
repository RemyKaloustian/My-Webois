import DataStore from "./data-store";

const API = 'http://localhost:4000/api/';

let headers = new Headers();

headers.append('Accept', 'application/json'); // This one is enough for GET requests
headers.append('Content-Type', 'application/json'); // This one sends body


export function insertAccident(accidentObj, type) {

    let newAccidentObj = {
        longitude: accidentObj.lng,
        latitude: accidentObj.lat
    };
    let options = {method: 'POST', body: JSON.stringify(newAccidentObj), headers: headers};
    fetch(API + 'accidents', options)
        .then(res => res.json())
        .then(data => {
                let accident = {
                    lng: data.longitude,
                    lat: data.latitude,
                };
                DataStore.instance.addAccident(accident);
            }
        );
}

export function getAllAccidents() {
    fetch(API + 'accidents')
        .then(res => res.json())
        .then(data => {
                let res = [];
                for (let e of data) {
                    let accident = {
                        longitude: e.location[0],
                        latitude: e.location[1],
                        ...e
                    };
                    //force to have a specific type
                    if (accident.type === '')
                        accident.type = 'Piéton percuté';

                    res.push(accident);
                }
                DataStore.instance.fillAccidents(res);
            }
        )
}

export function getAccident(accidentId) {
    fetch(API + 'accidents/' + accidentId)
        .then(res => res.json())
        .then(data => {
                let accident = {
                    longitude: data.location[0],
                    latitude: data.location[1],
                    ...data
                };
                DataStore.instance.addAccident(accident);
            }
        )
}

export function deleteAccident(accidentId) {
    fetch(API + 'accidents/' + accidentId, {method: 'DELETE', headers: headers})
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));
    getAllAccidents();
}

export function insertComment(accidentId, comment) {

}


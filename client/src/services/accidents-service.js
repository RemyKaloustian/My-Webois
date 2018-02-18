import DataStore from "./data-store";

const API = 'http://localhost:4000/api/';

//File for deletion, insertion of accidents
export function removeAccident(id) {
    console.log("Removing accident w/ id = " + id);
}

export function insertAccident(accidentObj, type) {

    let headers = new Headers();

    headers.append('Accept', 'application/json'); // This one is enough for GET requests
    headers.append('Content-Type', 'application/json'); // This one sends body

    let newAccidentObj = {
        longitude: accidentObj.lng,
        latitude: accidentObj.lat
    };
    let options = {method: 'POST', body: JSON.stringify(newAccidentObj), headers: headers};
    console.log("newAc", newAccidentObj)
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

export function insertComment(accidentId, comment) {
    console.log("Inserted comment on id " + accidentId);
    console.log(comment);
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
                    if(accident.type = '')
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
                DataStore.instance.addAccident(data);
            }
        )
}

import DataStore from "./data-store";

const API = 'http://localhost:4000/api/';

let headers = new Headers();

headers.append('Accept', 'application/json'); // This one is enough for GET requests
headers.append('Content-Type', 'application/json'); // This one sends body


export function insertAccident(accidentObj, type, severity) {

    let newAccidentObj = {
        longitude: accidentObj.lng,
        latitude: accidentObj.lat,
        seriousness: severity,
        type: type
    };
    let options = {method: 'POST', body: JSON.stringify(newAccidentObj), headers: headers};
    fetch(API + 'accidents', options)
        .then(res => res.json())
        .then(data => {
                let accident = {
                    longitude: data.location[0],
                    latitude: data.location[1],
                    ...data
                };
                DataStore.instance.addAccident(accident);
                getAllOrNearby();
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
                    res.push(accident);
                }
                DataStore.instance.fillAccidents(res);
            }
        )
}


export function getNearbyAccidents(longitude, latitude) {
    fetch(API + 'accidents?longitude=' + longitude + '&latitude=' + latitude)
        .then(res => {
            return res.json()
        })
        .then(data => {
                let res = [];
                for (let e of data) {
                    let accident = {
                        longitude: e.location[0],
                        latitude: e.location[1],
                        ...e
                    };
                    res.push(accident);
                }
                DataStore.instance.fillAccidents(res);
                if (res.length < 3) {
                    getAllOrNearby();
                }


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
                getAllOrNearby();

            }
        )

}

export function deleteAccident(accidentId) {
    fetch(API + 'accidents/' + accidentId, {method: 'DELETE', headers: headers})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            getAllOrNearby();
        })
        .catch(e => console.log(e));
}

export function insertComment(accidentId, comment) {
    fetch(API + 'accidents/' + accidentId + '/comments', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: '', comment: comment})
    })
        .then(res => res.json())
        .then(data => {
            getAllOrNearby();
            console.log(data);
        })
        .catch(e => console.log(e))

}

export function reportAccident(accidentId) {

    fetch(API + 'accidents/' + accidentId + '/remove', {method: 'PUT', headers: headers})
        .then(res => res.json())
        .then(data => {
            getAllOrNearby();
        })
        .catch(e => console.log(e))

}

export function getAllOrNearby() {
    if (DataStore.instance.getAll().length < 3)
        getAllAccidents();
    else if (DataStore.instance._currentPosition) {
        getNearbyAccidents(DataStore.instance._currentPosition.lng, DataStore.instance._currentPosition.lat);
    }
    else
        getAllAccidents()
}

export function managerConnection(name, password){
    let content = {
        username: name,
        password: password
    };
    fetch(API + 'auth/login', {method: 'POST', headers: headers, body: JSON.stringify(content)})
        .then(res => res.json())
        .then(data =>
        {
                DataStore.instance._userConnected = data.success;
        })
        .catch(e => {
            console.log(e);
            DataStore.instance._userConnected = false;
        })

}


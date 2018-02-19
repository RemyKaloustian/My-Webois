class DataStore {

    constructor() {
        if (!DataStore.instance) {
            this._accidents = [];
            this._severityEnum = [
                'Not serious',
                'Light',
                'Serious',
                'Deadly'
            ];
            this._accidentTypeEnum = [
                {name : 'Other', image: 'assets/icons/warning.png'},
                {name: 'Car', image: 'assets/icons/car.png'},
                {name:'Pedestrian', image: 'assets/icons/pedestrian.png'},
                {name:'Bicycle',image: 'assets/icons/bicycle.png'},
                {name:'Car & pedestrian',image: 'assets/icons/pedCar.png'},
                {name:'Bicycle & car',image: 'assets/icons/carBicycle.png'},
                {name: 'Bicycle & pedestrian',image: 'assets/icons/bicyclePed.png'},
            ];
            this._currentPosition = {lat : 0, lng : 0};
            this._userConnected = false;
            DataStore.instance = this;
        } else
            return DataStore.instance;
    }

    addAccident = (accident) => {
        this._accidents.push(accident);
    };

    fillAccidents = (accidents) => {
        this._accidents = accidents;
    };

    get = (id) => {
        return this._accidents.find(data => data.id === id);
    };

    getAll = () => {
        return this._accidents;
    };

}

const instance = new DataStore();

export default DataStore;
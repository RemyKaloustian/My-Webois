class DataStore {

    constructor() {
        if (!DataStore.instance) {
            this._accidents = [];
            this._severityEnum = [
                'Sans gravité',
                'Léger',
                'Grave',
                'Mortel'
            ];
            this._accidentTypeEnum = [
                {name : 'Autre', image: 'assets/icons/warning.png'},
                {name: 'Véhicules', image: 'assets/icons/car.png'},
                {name:'Piétons', image: 'assets/icons/pedestrian.png'},
                {name:'Vélos',image: 'assets/icons/bicycle.png'},
                {name:'Véhicule et piétons',image: 'assets/icons/pedCar.png'},
                {name:'Vélo et véhicule',image: 'assets/icons/carBicycle.png'},
                {name: 'Vélo et piéton',image: 'assets/icons/bicyclePed.png'},
            ];
            this._currentPosition = {lat : 0, lng : 0};
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
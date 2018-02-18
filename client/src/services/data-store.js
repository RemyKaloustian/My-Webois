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
                'Autre',
                'Véhicules',
                'Piétons',
                'Vélos',
                'Véhicule et piétons',
                'Vélo et véhicule',
                'Vélo et piéton',
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
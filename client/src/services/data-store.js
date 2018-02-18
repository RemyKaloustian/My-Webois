class DataStore {

    constructor() {
        if (!DataStore.instance) {
            this._accidents = [
                // {
                //     id: 0,
                //     latitude: 43.616735,
                //     longitude: 7.074767,
                //     address: 'Carrefour Saint Phillipe',
                //     type: 'Piéton percuté',
                //     date: '09/04/2016',
                //     comments: [{id: 0, comment: 'Les piétons sont débiles'}, {
                //         id: 1,
                //         comment: 'Skaters fréquents (et qui ne regardent même pas la route) '
                //     }]
                // }
        ];
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
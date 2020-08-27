import ApiService from '../apiservice'

import ValidationError from '../exception/validationError'

export default class VehicleService extends ApiService{

    constructor(){
        super('/vehicles')
    }
    
    takeListSituation(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Em uso', value: 'EMUSO'},
            {label: 'Manutenção', value: 'MANUTENCAO'},
            {label: 'Vendido', value: 'VENDIDO'},

        ]

    }

    

    takeListManufacturer(){
        return [
            {label: 'Selecione...', value: ''},
            {label: 'Toyota', value: 'TOYOTA'},
            {label: 'Honda', value: 'HONDA'},
            {label: 'Fiat', value: 'FIAT'},
            {label: 'VW', value: 'VW'},

        ]

    }

    takeId(id){
        return this.get(`/${id}`);
    }

    validate(vehicle){
        const error = [];

        if(!vehicle.modelVehicle){
            error.push("Informe o modelo do veículo.")
        }

        if(!vehicle.licensePlate){
            error.push("Informe a palca do veículo .")
        }

        if(!vehicle.manufacturer){
            error.push("Informe o fabricante.")
        }

        if(!vehicle.purchasePrice){
            error.push("Informe o valor de compra.")
        }

        if(!vehicle.purchaseDate){
            error.push("Informe a data de compra.")
        }

        if(!vehicle.situation){
            error.push("Informe a situação do veículo.")
        }

        if(error && error.length > 0){
            throw new ValidationError(error);
        }



    }

    //Salvando cadastro do veiculos...
    save(vehicle){
        return this.post('/', vehicle)
    }
    //Atualizando caastro do veiculo...
    updated(vehicle){
        return this.put(`/${vehicle.id}`, vehicle)
    }
    
    consult(VehicleFilter){

        let params = `?purchaseDate=${VehicleFilter.purchaseDate}`
        

        if(VehicleFilter.situation){
            params = `${params}&situation=${VehicleFilter.situation}`
        }

        if(VehicleFilter.user){
            params = `${params}&user=${VehicleFilter.user}`
        }

        return this.get(params);
    }

    delete(id){
        return this.delete(`/${id}`)
    }

}
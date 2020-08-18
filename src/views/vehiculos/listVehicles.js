import React from 'react'
import {withRouter} from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import VehiclesTable from './vehiclesTable'
import VehicleService from '../../app/service/vehicleService'
import {AuthContext} from '../../main/authenticationProvider'
import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

class ListVehicles extends React.Component{

    state = {
        purchaseDate: '',
        situation: '',
        showConfirmDialog:false,
        vehicleDelete: {},
        vehicles: []
    }

    constructor(){
        super();
        this.service = new VehicleService();
    }
    
    take = () => {
        const userAtenticate = this.context.userAtenticate
        const vehicleFilter = {
            purchaseDate: this.state.purchaseDate,
            situation: this.state.situation,
            user: userAtenticate.id

        }
            
        this.service
            .consult(vehicleFilter)
            .then(response => {
                const lista = response.data;
                if(lista.length < 1){
                    messages.messageWarning("Nenhum resultado encontrado.");
                }
                this.setState({vehicles: response.data})
        }).catch(error => {
            console.log(error)
        })
    }

    edit = (id) => {
        this.props.history.push(`/cadastrar_veiculo/${id}`)
    }

    
    confirmDelete = (vehicle) =>{
        this.setState({showConfirmDialog: true, vehicleDelete: vehicle})

    }

    cancelDelete = () => {
        this.setState({showConfirmDialog: false, vehicleDelete: {} })

    }
    
    delete = (vehicle) => {
        this.service
            .delete(this.vehicleDelete.id)
            .then(response => {
                const vehicles = this.state.vehicleDelete.id;
                const index = vehicles.indexOf(this.vehicleDelete);
                vehicles.splice(index, 1);
                this.setState({vehicles: vehicles, showConfirmDialog: false})
                    messages.messageSuccess('Veículo deletado com suscesso!')
            }).catch(error =>{
                    messages.messageError('Erro, não foi possível deletar veiculo!')
            })
    }


    render(){

        const situation = this.service.takeListSituation();
        
        const ConfirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.delete} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelDelete} />
            </div>
        );

    
        return(
            
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-docs-section">
                        <Card title="Listar Veículos">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup htmlFor= 'inputPeriod' label="Período de compra: ">
                                                <input type="date"
                                                className="form-control"
                                                value={this.state.purchaseDate}
                                                    onChange={e => this.setState({purchaseDate: e.target.value})}/> <br />
                                                 
                                            </FormGroup> <br />

                                            <FormGroup htmlFor= 'inputSituation' label="Situation: ">
                                                <SelectMenu 
                                                className='form-control' 
                                                lista={situation}
                                                value={this.state.situation}
                                                onChange={e => this.setState({situation: e.target.value})} />
                                            </FormGroup>

                                            <button onClick={this.take} 
                                                type="button" 
                                                className="btn btn-success">
                                                <i className="pi pi-search"></i> Buscar
                                            </button>
                                            <button  onClick={this.delete} 
                                                type="button" 
                                                className="btn btn-danger">
                                                <i className="pi pi-plus"></i> Cadastrar
                                            </button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                                <br/><br/><br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <VehiclesTable vehicle={this.state.vehicles}
                                                        deleteAction={this.confirmDelete}
                                                        editAction={this.edit}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                            <Dialog header="Godfather I" 
                                    visible={this.state.showConfirmDialog} 
                                    style={{width: '50vw'}} 
                                    footer={ConfirmDialogFooter}
                                    modal={true} 
                                    onHide={() => this.setState({showConfirmDialog: false})}>
                                Tem certeza que deseja deletar esse cadastro de veículo?
                            </Dialog>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
ListVehicles.contextType = AuthContext;

export default withRouter(ListVehicles);
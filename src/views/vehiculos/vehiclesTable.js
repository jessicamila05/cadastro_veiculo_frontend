import React  from 'react'
import currencyFormatter from 'currency-formatter'

export default props  => {

    const rows = props.vehicles && props.vehicles.map(vehicle => { 
        return (

                <tr key={vehicle.id}> 
                <td>{vehicle.modelVehicle}</td>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.manufacturer}</td>
                <td>{currencyFormatter.format(vehicle.purchasePrice, {locale: 'pt-BR'})}</td>
                <td>{currencyFormatter.format(vehicle.saleValue,  {locale: 'pt-BR'})}</td>
                <td>{vehicle.purchaseDate}</td>
                <td>{vehicle.saleDate}</td>
                <td>{vehicle.situation}</td>
                <td>
                    <button type="button" 
                    className="btn btn-primary"
                    onclick={e => props.editAction(vehicle.id)}>
                        Editar
                    </button>
                    <button type="button" 
                    className="btn btn-danger" 
                    onclick={e => props.deleteAction(vehicle.id)}>
                        Deletar
                    </button>
                </td>
            </tr>

        )	
    })
    
    

    return (
        <table className="table table-houver"> 
            <thead>
                <tr>
                    <th scope="col">Modelo do Veículo</th>
                    <th scope="col">Placa</th>
                    <th scope="col">Fabricante</th>
                    <th scope="col">Valor de compra</th>
                    <th scope="col">Valor de Venda</th>
                    <th scope="col">Data de Campra</th>
                    <th scope="col">Data de venda</th>
                    <th scope="col">Situação</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>

        </table>

    )
}
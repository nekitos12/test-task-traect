import React, {useState, useLayoutEffect, useEffect, useCallback} from 'react';

import {
  CircularProgress,
  Text, Select, useForceUpdate
} from '@chakra-ui/react'
import api from "./services";
import {IVehicle} from "./services/vehicles/types";
import VehicleCard from "./components/VehicleCard";

const filters = [
  {
    value: 'default',
    label: 'Выберите параметр'
  }, {
    value: 'price',
    label: 'цене'
  }, {
    value: 'year',
    label: 'году'
  }]
const App = () => {
  const [vehicles, setVehicles] = useState([] as IVehicle[])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const forceUpdate = useForceUpdate()
  useLayoutEffect(() => {
    setIsLoading(true)
    api.vehicles.get().then(({data}) => {
      setVehicles(data)
      setIsLoading(false)
    })
  }, [])

  const sortVehicles = () => {
    if (filter === 'year') {
      setVehicles(prev => prev
        .sort(({year: year1}, {year: year2}) => year1 - year2))
    }
    if (filter === 'price') {
      setVehicles(prev => prev
        .sort(({price: price1}, {price: price2}) => price1 - price2))
    }
  }

  useEffect(() => {
    sortVehicles()
    forceUpdate()
  }, [filter])

  const onEditSubmit = (id: number, data: {
    model: string
    name: string
    price: number
  }) => {
    setVehicles(prev => prev.map(vehicle => id === vehicle.id ? {
      ...vehicle,
      model: data.model,
      name: data.name,
      price: data.price
    } : {...vehicle}))
    sortVehicles()
  }

  const onDeleteVehicle = useCallback((id: number) => setVehicles(prev => prev.filter(vehicle => vehicle.id !== id)), [])

  return (
    <>
      {isLoading ?
        <CircularProgress isIndeterminate color='green.300'/>
        :
        <>
          <Text>
            Сортировать по:
            <Select onChange={(e) => setFilter(e.target.value)} value={filter} defaultValue="default">
              {filters.map(option => <option key={option.value} {...option} />)}
            </Select>
          </Text>
          <ul style={{listStyle: 'none'}}>
            {vehicles.map(({id, name, model, year, color, price}) => {
              return <li key={id}>
                <VehicleCard name={name} model={model} year={year} color={color} price={price} id={id}
                             onEditSubmit={onEditSubmit} onDeleteVehicle={onDeleteVehicle}/>
              </li>
            })
            }
          </ul>
        </>
      }
    </>
  )
}

export default App;
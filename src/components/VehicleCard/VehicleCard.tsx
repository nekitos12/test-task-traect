import React, {FC, memo, useState} from 'react';
import {
  Card, CardBody, Flex, Heading, Input,
  NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField,
  NumberInputStepper, Stack, Text
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

interface VehicleCardProps {
  name: string
  model: string
  year: number
  color: string
  price: number
  id: number
  onEditSubmit: (id: number, data: {
    model: string
    name: string
    price: number
  }) => void

  onDeleteVehicle: (id: number) => void
}

const VehicleCard: FC<VehicleCardProps> = memo((props) => {
  const {
    color,
    price,
    year,
    name,
    model,
    id,
    onEditSubmit,
    onDeleteVehicle
  } = props
  const [isEditing, setIsEditing] = useState(false)
  const [data, setEditData] = useState({model, name, price})
  return (
    <Card maxW='sm' maxH="100%" marginBottom='8'>
      <CardBody>
        <Stack mt='6' spacing='3'>
          {isEditing ?
            <>
              <Flex justifyContent="space-between" alignItems="center">
                <Input onChange={(e) => setEditData(prev => ({
                  ...prev,
                  name: e.target.value
                }))} placeholder='small size' size='sm' defaultValue={name}/>
                <Input onChange={(e) => setEditData(prev => ({
                  ...prev,
                  model: e.target.value
                }))} placeholder='small size' size='sm' defaultValue={model}/>
                <Text flexWrap="nowrap" flexShrink="0">
                  {year} {color}
                </Text>
              </Flex>

              <NumberInput color='blue.600' fontSize='2xl' defaultValue={price} size='sm' step={100}
                           onChange={(value) => setEditData(prev => ({
                             ...prev,
                             price: Number(value)
                           }))}>
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
            </>
            : (
              <>
                <Heading size='md'>{name} {model} {year} {color}</Heading>
                <Text color='blue.600' fontSize='2xl'>
                  {price}
                </Text></>
            )}
          <Flex justifyContent="center" alignItems="center">
            <button onClick={() => {
              if (isEditing) onEditSubmit(id, data)
              setIsEditing(prev => !prev)
            }}>{isEditing ? 'Сохранить' : 'Редактировать'}</button>
            <DeleteIcon onClick={() => onDeleteVehicle(id)} ml={10}/>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  )
    ;
});

export default VehicleCard;
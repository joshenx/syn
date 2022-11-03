import * as React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

export const VoteDataDisplay = () => {
  return (
    <TableContainer>
      <Table size='md'>
        <Thead>
          <Tr>
            <Th>Color</Th>
            <Th>Hex Code</Th>
            <Th isNumeric>Votes</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Color</Th>
            <Th>Hex Code</Th>
            <Th isNumeric>Votes</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
};

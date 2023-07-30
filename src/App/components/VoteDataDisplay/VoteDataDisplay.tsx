import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Text,
} from '@chakra-ui/react';

export const VoteDataDisplay = ({ data }: { data: any[] | null }) => {
  const MAX_NUM_TO_DISPLAY = 10;

  return (
    <TableContainer
      overflowY="auto"
      maxHeight="230px"
      p="0rem 1rem"
      sx={{
        '&::-webkit-scrollbar': {
          width: '16px',
          borderRadius: '5px',
          backgroundColor: `rgba(0, 25, 25, 0.1)`,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '3px',
          backgroundColor: `rgba(0, 25, 25, 0.2)`,
        },
      }}
    >
      <Table size={{ base: 'sm', md: 'md' }}>
        <Thead>
          <Tr>
            <Th>Color</Th>
            <Th>Hex Code</Th>
            <Th isNumeric>
              Votes ({data?.reduce((sum, a) => sum + a.vote_count, 0)})
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.length === 0 ? (
            <Tr>
              <Td colSpan={3}>
                <Text color="gray.400" fontSize="md">
                  Be the first to vote!
                </Text>
              </Td>
            </Tr>
          ) : (
            data?.slice(0, MAX_NUM_TO_DISPLAY).map((row) => {
              return (
                <Tr key={row.hex_code}>
                  <Td>
                    <Button
                      borderRadius="10%"
                      borderStyle="solid"
                      borderWidth="2px"
                      borderColor="var(--chakra-colors-chakra-border-color)"
                      height="1.2rem"
                      bgColor={row.hex_code}
                      _hover={{
                        transform: 'scale(1.2, 1.2)',
                        boxShadow: `0px 0px 5px 0px ${row.hex_code}`,
                      }}
                      _active={{
                        transform: 'scale(2, 4)',
                        borderColor: `${row.hex_code}`,
                        boxShadow: 'none',
                      }}
                      transition="all cubic-bezier(.6,.02,.13,.99) 0.5s"
                    ></Button>
                  </Td>
                  <Td>
                    <Text as="kbd">{row.hex_code.toUpperCase()}</Text>
                  </Td>
                  <Td isNumeric>{row.vote_count}</Td>
                </Tr>
              );
            })
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Color</Th>
            <Th>Hex Code</Th>
            <Th isNumeric>
              Votes ({data?.reduce((sum, a) => sum + a.vote_count, 0)})
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

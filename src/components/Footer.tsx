import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MdCatchingPokemon } from 'react-icons/md';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'700'} fontSize={'lg'} mb={2} color="red.500">
      {children}
    </Text>
  );
};

interface FooterProps {
  navigate: (page: 'home' | 'legendaries' | 'checkout' | 'profile' | 'contact') => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <Box
      bg={useColorModeValue('gray.900', 'gray.900')}
      color={useColorModeValue('gray.200', 'gray.200')}
      mt={10}>
      <Container as={Stack} maxW={'7xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Centros Pokémon</ListHeader>
            <Link href={'#'}>Región de Kanto</Link>
            <Link href={'#'}>Región de Johto</Link>
            <Link href={'#'}>Región de Hoenn</Link>
            <Link onClick={() => navigate('contact')}>Contáctanos</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Liga Pokémon</ListHeader>
            <Link href={'#'}>Reglas del torneo</Link>
            <Link href={'#'}>Términos de servicio</Link>
            <Link href={'#'}>Política de privacidad</Link>
            <Link href={'#'}>Envíos de medallas</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Profesores</ListHeader>
            <Link href={'#'}>Profesor Oak</Link>
            <Link href={'#'}>Profesor Elm</Link>
            <Link href={'#'}>Investigación</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>
              <Icon as={MdCatchingPokemon} w={6} h={6} mr={2} verticalAlign="middle" />
              Aura PokeMart
            </ListHeader>
            <Text fontSize={'sm'}>
              © 2026 Aura PokeMart. Todos los derechos reservados.
            </Text>
            <Text fontSize={'sm'}>
              Tu tienda de confianza para atraparlos a todos.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

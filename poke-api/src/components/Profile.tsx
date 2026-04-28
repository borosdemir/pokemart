import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Avatar,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Icon,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdCatchingPokemon } from 'react-icons/md';

interface ProfileProps {
  navigate: (page: 'home' | 'legendaries' | 'checkout' | 'profile' | 'contact') => void;
}

export default function Profile({ navigate }: ProfileProps) {
  // Datos de prueba simulando el perfil
  const user = {
    name: 'Entrenador Ash',
    region: 'Kanto',
    trainerId: 'PKMN-1996-0151',
    pokedollars: 15400,
    badges: ['Roca', 'Cascada', 'Trueno', 'Arcoíris'],
    pokemon: [
      { name: 'Pikachu', type: 'Eléctrico', level: 42, color: 'yellow' },
      { name: 'Charizard', type: 'Fuego', level: 50, color: 'orange' },
      { name: 'Bulbasaur', type: 'Planta', level: 16, color: 'green' },
    ]
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={20}>
      <Container maxW="5xl">
        <Box as={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 } as any}>
          {/* Trainer Card */}
          <Box bgGradient="linear(to-r, red.500, red.600)" rounded="3xl" p={1} boxShadow="2xl" mb={10}>
            <Box bg="white" rounded="3xl" p={8} h="full">
              <HStack spacing={8} align="center" flexDir={{ base: 'column', md: 'row' }}>
                <Avatar size="2xl" name={user.name} src="https://bit.ly/dan-abramov" border="4px solid" borderColor="red.500" />
                <VStack align={{ base: 'center', md: 'start' }} spacing={2} flex={1}>
                  <Badge colorScheme="red" rounded="full" px={3} py={1}>ID: {user.trainerId}</Badge>
                  <Heading size="2xl" color="gray.800">{user.name}</Heading>
                  <Text fontSize="lg" color="gray.500" fontWeight="bold">Región de {user.region}</Text>
                  
                  <HStack mt={4} spacing={4}>
                    <Box bg="gray.100" p={3} rounded="xl">
                      <Text fontSize="sm" color="gray.500">Pokédólares</Text>
                      <Text fontSize="xl" fontWeight="black" color="green.500">${user.pokedollars}</Text>
                    </Box>
                    <Box bg="gray.100" p={3} rounded="xl">
                      <Text fontSize="sm" color="gray.500">Medallas</Text>
                      <Text fontSize="xl" fontWeight="black" color="orange.400">{user.badges.length}/8</Text>
                    </Box>
                  </HStack>
                </VStack>
                <Icon as={MdCatchingPokemon} w={32} h={32} color="red.100" />
              </HStack>
            </Box>
          </Box>

          <Heading size="lg" mb={6}>Tu Equipo Actual</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
            {user.pokemon.map((p, idx) => (
              <Box key={idx} bg="white" p={6} rounded="2xl" boxShadow="md" borderTop="4px solid" borderColor={`${p.color}.400`} as={motion.div} whileHover={{ y: -5 }}>
                <HStack justify="space-between" mb={2}>
                  <Heading size="md">{p.name}</Heading>
                  <Badge colorScheme={p.color}>{p.type}</Badge>
                </HStack>
                <Text color="gray.500" fontWeight="bold">Nv. {p.level}</Text>
              </Box>
            ))}
          </SimpleGrid>

          <Center>
            <Button size="lg" colorScheme="red" rounded="full" onClick={() => navigate('home')}>
              Ir a Atrapar Más
            </Button>
          </Center>

        </Box>
      </Container>
    </Box>
  );
}
import { Center } from '@chakra-ui/react';

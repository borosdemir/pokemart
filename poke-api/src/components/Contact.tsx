import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MdLocalHospital } from 'react-icons/md';

interface ContactProps {
  navigate: (page: 'home' | 'legendaries' | 'checkout' | 'profile' | 'contact') => void;
}

export default function Contact({ navigate }: ContactProps) {
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Mensaje enviado a la Enfermera Joy',
      description: 'Nos pondremos en contacto contigo lo antes posible.',
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
    navigate('home');
  };

  return (
    <Box bg="gray.50" minH="100vh" py={20}>
      <Container maxW="3xl">
        <Box as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 } as any}>
          <Box bg="white" p={10} rounded="3xl" boxShadow="xl" textAlign="center">
            <Icon as={MdLocalHospital} w={16} h={16} color="pink.400" mb={4} />
            <Heading mb={2} color="pink.500" fontSize="3xl">Centro de Atención Pokémon</Heading>
            <Text color="gray.600" mb={8}>¿Tienes dudas sobre una adopción o la salud de tus Pokémon? ¡Escríbenos!</Text>

            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch" textAlign="left">
                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Nombre</FormLabel>
                    <Input placeholder="Tu nombre" focusBorderColor="pink.400" rounded="full" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Correo Electrónico</FormLabel>
                    <Input type="email" placeholder="tu@correo.com" focusBorderColor="pink.400" rounded="full" />
                  </FormControl>
                </HStack>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Asunto</FormLabel>
                  <Input placeholder="Ej. Problemas con la entrega de mi Charmander" focusBorderColor="pink.400" rounded="full" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Mensaje</FormLabel>
                  <Textarea placeholder="Cuéntanos los detalles..." focusBorderColor="pink.400" rounded="2xl" rows={5} />
                </FormControl>

                <Button 
                  type="submit"
                  size="lg" 
                  bg="pink.400"
                  color="white" 
                  rounded="full" 
                  mt={4}
                  _hover={{ bg: 'pink.500', transform: 'scale(1.02)' }}
                  transition="all 0.2s"
                >
                  Enviar Mensaje
                </Button>
              </VStack>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

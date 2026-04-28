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
  Image,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface CheckoutProps {
  navigate: (page: 'home' | 'legendaries' | 'checkout' | 'profile' | 'contact') => void;
}

export default function Checkout({ navigate }: CheckoutProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const toast = useToast();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    toast({
      title: '¡Transferencia completada!',
      description: 'Tus Pokémon han sido enviados a tu PC.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
    
    clearCart();
    navigate('profile');
  };

  return (
    <Box bg="gray.50" minH="100vh" py={20}>
      <Container maxW="5xl">
        <Box as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 } as any}>
          <Heading mb={2} color="red.500" fontSize="4xl">Centro de Adopción</Heading>
          <Text color="gray.600" fontSize="lg" mb={10}>Completa tu registro de entrenador para finalizar la transferencia.</Text>

          <HStack spacing={10} align="flex-start" flexDir={{ base: 'column', md: 'row' }}>
            {/* Formulario */}
            <Box flex={1} bg="white" p={8} rounded="2xl" boxShadow="xl" w="full">
              <form onSubmit={handleCheckout}>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Nombre del Entrenador</FormLabel>
                    <Input placeholder="Ej. Ash Ketchum" focusBorderColor="red.500" rounded="full" />
                  </FormControl>

                  <HStack w="full" spacing={4}>
                    <FormControl isRequired>
                      <FormLabel fontWeight="bold">Región</FormLabel>
                      <Input placeholder="Ej. Kanto" focusBorderColor="red.500" rounded="full" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontWeight="bold">Ciudad / Pueblo</FormLabel>
                      <Input placeholder="Ej. Pueblo Paleta" focusBorderColor="red.500" rounded="full" />
                    </FormControl>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">ID de Licencia Pokémon</FormLabel>
                    <Input placeholder="PKMN-XXXX-XXXX" focusBorderColor="red.500" rounded="full" />
                  </FormControl>

                  <Button 
                    type="submit"
                    w="full" 
                    size="lg" 
                    colorScheme="red" 
                    rounded="full" 
                    mt={4}
                    isDisabled={cart.length === 0}
                    _hover={{ transform: 'scale(1.02)' }}
                    transition="all 0.2s"
                  >
                    Confirmar Adopción
                  </Button>
                </VStack>
              </form>
            </Box>

            {/* Resumen */}
            <Box flex={0.8} bg="white" p={8} rounded="2xl" boxShadow="xl" w="full">
              <Heading size="md" mb={6}>Resumen del Equipo</Heading>
              
              {cart.length === 0 ? (
                <Text color="gray.500">No tienes Pokémon seleccionados.</Text>
              ) : (
                <VStack spacing={4} align="stretch" mb={6}>
                  {cart.map(item => (
                    <HStack key={item.id} justify="space-between">
                      <HStack>
                        <Image src={item.image} boxSize="40px" objectFit="contain" />
                        <Text fontWeight="bold" textTransform="capitalize">{item.title} <Text as="span" color="gray.500" fontSize="sm">x{item.quantity}</Text></Text>
                      </HStack>
                      <Text fontWeight="bold" color="red.500">${(item.price * item.quantity).toFixed(2)}</Text>
                    </HStack>
                  ))}
                </VStack>
              )}

              <Divider mb={6} />
              
              <HStack justify="space-between" fontSize="2xl" fontWeight="black">
                <Text>Total:</Text>
                <Text color="red.500">${totalPrice.toFixed(2)}</Text>
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}

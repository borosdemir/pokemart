import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Badge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  HStack,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import { FiShoppingCart } from 'react-icons/fi';
import { MdCatchingPokemon } from 'react-icons/md';
import { useBreakpointValue } from '@chakra-ui/react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';



interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  navigate: (page: 'home' | 'legendaries') => void;
}

export default function Navbar({ searchQuery, onSearchChange, navigate }: NavbarProps) {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } = useDisclosure();
  const cartBtnRef = useRef<HTMLButtonElement>(null);

  const { cart, removeFromCart, totalItems, totalPrice } = useCart();
  const { user, login, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const toast = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleLogin = () => {
    if (!emailInput) {
      toast({ title: 'Error', description: 'Por favor ingresa un correo.', status: 'error', duration: 2000 });
      return;
    }
    login(emailInput);
    onAuthClose();
    navigate('profile');
    toast({
      title: '¡Entrenador conectado!',
      description: 'Has iniciado sesión en tu PokeDex.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const handleLogout = () => {
    logout();
    navigate('home');
    toast({
      title: 'Sesión cerrada',
      description: 'Has guardado tu partida exitosamente.',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 8 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justifyContent={'space-between'}
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="sm"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        {/* Logo */}
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center" cursor="pointer" onClick={() => navigate('home')}>
          <Box
            as={motion.div}
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200 } as any}
          >
            <Icon 
              as={MdCatchingPokemon} 
              w={8} h={8} color="red.500" mr={2}
            />
          </Box>
          <Box
            as={motion.div}
            whileHover={{ scale: 1.05 }}
          >
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('red.600', 'red.400')}
              fontWeight="900"
              fontSize="2xl"
              letterSpacing="-1px"
            >
              Aura PokeMart
            </Text>
          </Box>
        </Flex>

        {/* Search Bar */}
        <Box display={{ base: 'none', md: 'block' }} mx={8} flex={1}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input 
              type="text" 
              placeholder="Busca tu Pokémon favorito..." 
              borderRadius="full" 
              value={searchQuery}
              onChange={handleSearch}
              bg="gray.100"
              border="none"
              _focus={{ ring: 2, ringColor: "red.400" }}
            />
          </InputGroup>
        </Box>

        {/* Actions */}
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={4}
          alignItems="center"
        >
          <Box position="relative">
            <IconButton
              ref={cartBtnRef}
              onClick={onCartOpen}
              aria-label="PokeDex"
              icon={<Icon as={FiShoppingCart} />}
              variant="ghost"
              colorScheme="red"
              fontSize="20px"
              _hover={{ bg: "red.50", color: "red.500" }}
            />
            {totalItems > 0 && (
              <Badge 
                colorScheme="red" 
                borderRadius="full" 
                position="absolute" 
                top="-1" 
                right="-1"
                fontSize="0.8em"
              >
                {totalItems}
              </Badge>
            )}
          </Box>
          
          {user ? (
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={user.avatar} name={user.name} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('profile')} fontWeight="bold">Mi Perfil (Trainer Card)</MenuItem>
                <MenuItem onClick={handleLogout} color="red.500">Guardar y Salir</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={600}
                variant={'link'}
                onClick={onAuthOpen}
                cursor="pointer"
                display={{ base: 'none', md: 'inline-flex' }}
                color="gray.600"
                _hover={{ color: "red.500" }}
              >
                Ingresar
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={700}
                color={'white'}
                bg={'red.500'}
                onClick={onAuthOpen}
                rounded="full"
                _hover={{
                  bg: 'red.600',
                  transform: 'scale(1.05)'
                }}
                transition="all 0.2s"
              >
                Regístrate
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        placement='right'
        onClose={onCartClose}
        finalFocusRef={cartBtnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            {user ? `Equipo de ${user.name}` : 'Tu Equipo Pokémon'}
          </DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <Flex h="full" justify="center" align="center" direction="column">
                <Icon as={MdCatchingPokemon} w={16} h={16} color="gray.300" mb={4} />
                <Text color="gray.500" fontSize="lg">Tu PokéDex está vacía.</Text>
              </Flex>
            ) : (
              <VStack spacing={4} align="stretch" mt={4}>
                {cart.map((item) => (
                  <HStack key={item.id} justify="space-between" p={3} borderWidth="1px" borderRadius="xl" bg="gray.50">
                    <Image src={item.image} alt={item.title} boxSize="60px" objectFit="contain" filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"/>
                    <Box flex={1} ml={3}>
                      <Text fontWeight="bold" noOfLines={1} textTransform="capitalize" fontSize="lg">{item.title}</Text>
                      <Text color="red.500" fontWeight="bold">${item.price.toFixed(2)} x {item.quantity}</Text>
                    </Box>
                    <IconButton 
                      aria-label="Eliminar" 
                      icon={<DeleteIcon />} 
                      colorScheme="red" 
                      variant="ghost" 
                      onClick={() => removeFromCart(item.id)} 
                    />
                  </HStack>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px' flexDirection="column" gap={4}>
            <Flex w="full" justify="space-between" fontSize="2xl" fontWeight="black">
              <Text>Total Pokedólares:</Text>
              <Text color="red.500">${totalPrice.toFixed(2)}</Text>
            </Flex>
            <Button colorScheme='red' w="full" size="lg" rounded="full" fontWeight="bold" isDisabled={cart.length === 0} onClick={() => {
              onCartClose();
              navigate('checkout');
            }}>
              Ir a Pagar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Auth Modal */}
      <Modal isOpen={isAuthOpen} onClose={onAuthClose}>
        <ModalOverlay backdropFilter="blur(10px)"/>
        <ModalContent rounded="2xl">
          <ModalHeader textAlign="center" pt={8}>
            <Icon as={MdCatchingPokemon} w={12} h={12} color="red.500" mb={2}/>
            <br/>
            Identificación de Entrenador
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontWeight="bold">Correo Electrónico</FormLabel>
              <Input 
                placeholder='ash@kanto.com' 
                focusBorderColor="red.500" 
                rounded="full" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </FormControl>

            <FormControl mt={6}>
              <FormLabel fontWeight="bold">Contraseña</FormLabel>
              <Input placeholder='********' type="password" focusBorderColor="red.500" rounded="full"/>
            </FormControl>
          </ModalBody>

          <ModalFooter pb={8} justifyContent="center">
            <Button colorScheme='red' w="full" rounded="full" size="lg" onClick={handleLogin}>
              Acceder al PC
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

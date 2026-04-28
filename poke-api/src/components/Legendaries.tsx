import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Center,
  Spinner,
  Button,
  Image,
  Stack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useCart, Product } from '../context/CartContext';
import { useLegendaries } from '../hooks/usePokemon';

interface LegendariesProps {
  navigate: (page: 'home' | 'legendaries') => void;
}

const typeColors: { [key: string]: string } = {
  Fuego: 'orange',
  Hielo: 'cyan',
  Eléctrico: 'yellow',
  Psíquico: 'purple',
  Volador: 'blue',
};

const typeTranslations: { [key: string]: string } = {
  fire: 'Fuego',
  ice: 'Hielo',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  flying: 'Volador',
};

const LegendaryCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const badgeColor = typeColors[product.category] || 'gray';

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 } as any}
      whileHover={{ y: -15, scale: 1.05 }}
      role={'group'}
      p={6}
      maxW={'400px'}
      w={'full'}
      bg={useColorModeValue('gray.900', 'gray.800')}
      color="white"
      boxShadow={'0px 20px 40px rgba(0,0,0,0.4)'}
      rounded={'3xl'}
      pos={'relative'}
      zIndex={1}
      border="2px solid"
      borderColor="yellow.400"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      overflow="hidden"
    >
      {/* Sparkle background effect */}
      <Box
        position="absolute"
        top="-50%"
        left="-50%"
        w="200%"
        h="200%"
        bgGradient="radial(yellow.300 0%, transparent 60%)"
        opacity={0.15}
        zIndex={-1}
        as={motion.div}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" } as any}
      />
      
      <Box
        rounded={'2xl'}
        mt={-4}
        pos={'relative'}
        height={'250px'}
        bg="transparent"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          as={motion.div}
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 } as any}
          h="full"
          w="full"
          display="flex"
          justifyContent="center"
        >
          <Image
            rounded={'lg'}
            maxHeight="100%"
            maxWidth="100%"
            objectFit={'contain'}
            src={product.image}
            alt={product.title}
            filter="drop-shadow(0px 15px 15px rgba(255,215,0,0.5))"
          />
        </Box>
      </Box>
      <Stack pt={10} align={'center'} flex={1} justify="flex-end">
        <Badge colorScheme={badgeColor} mb={2} px={4} py={1} rounded="full" fontSize="sm" textTransform="uppercase">
          Legendario • {product.category}
        </Badge>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={800} textAlign="center" textTransform="capitalize" letterSpacing="wider">
          {product.title}
        </Heading>
        <Stack direction={'row'} align={'center'} mt={2}>
          <Text fontWeight={900} fontSize={'4xl'} color="yellow.400">
            ${product.price.toLocaleString()}
          </Text>
        </Stack>
        <Button 
          w="full" 
          mt={6} 
          bg="yellow.400" 
          color="gray.900" 
          rounded="full"
          size="lg"
          fontWeight="black"
          textTransform="uppercase"
          _hover={{ bg: 'yellow.500', transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
          transition="all 0.2s"
          onClick={() => addToCart(product)}
        >
          Lanzar Master Ball
        </Button>
      </Stack>
    </Box>
  );
};

export default function Legendaries({ navigate }: LegendariesProps) {
  const legendaryIds = [144, 145, 146, 150, 151];
  const { legendaries, loading, error } = useLegendaries(legendaryIds);

  return (
    <Box bg="gray.900" minH="100vh" py={20} position="relative" overflow="hidden">
      {/* Background Particles/Glow */}
      <Box position="absolute" top="10%" left="20%" w="500px" h="500px" bg="purple.500" filter="blur(150px)" opacity={0.3} borderRadius="full" zIndex={0} />
      <Box position="absolute" bottom="10%" right="20%" w="400px" h="400px" bg="blue.500" filter="blur(150px)" opacity={0.3} borderRadius="full" zIndex={0} />

      <Container maxW={'7xl'} position="relative" zIndex={1}>
        <Button 
          leftIcon={<ArrowBackIcon />} 
          variant="link" 
          color="white" 
          mb={8} 
          onClick={() => navigate('home')}
          _hover={{ color: "yellow.400" }}
        >
          Volver a la Tienda
        </Button>

        <Box textAlign="center" mb={16}>
          <Heading as="h1" size="3xl" color="white" fontWeight="black" letterSpacing="tight" mb={4}>
            Santuario <Text as="span" color="yellow.400">Legendario</Text>
          </Heading>
          <Text color="gray.400" fontSize="xl" maxW="2xl" mx="auto">
            Sólo los entrenadores más experimentados tienen acceso a esta zona. Estas criaturas poseen un poder incalculable.
          </Text>
        </Box>

        {loading ? (
          <Center py={20} flexDir="column">
            <Spinner size="xl" color="yellow.400" thickness="4px" speed="0.8s" />
            <Text mt={4} color="yellow.400" fontWeight="bold">Sincronizando con satélites...</Text>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={12} justifyItems="center">
            {legendaries.map((pokemon) => (
              <LegendaryCard key={pokemon.id} product={pokemon} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}

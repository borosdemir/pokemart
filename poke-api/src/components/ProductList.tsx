import { useState, useEffect } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Button,
  Spinner,
  Container,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCart, Product } from '../context/CartContext';
import { usePokemonList } from '../hooks/usePokemon';

interface ProductListProps {
  searchQuery: string;
  selectedCategory: string | null;
}

const typeTranslations: { [key: string]: string } = {
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  bug: 'Bicho',
  normal: 'Normal',
  poison: 'Veneno',
  ground: 'Tierra',
};

const typeColors: { [key: string]: string } = {
  Fuego: 'orange',
  Agua: 'blue',
  Planta: 'green',
  Eléctrico: 'yellow',
  Psíquico: 'purple',
  Bicho: 'teal',
  Normal: 'gray',
  Veneno: 'purple',
  Tierra: 'yellow',
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const badgeColor = typeColors[product.category] || 'gray';

  return (
    <Center py={8}>
        <Box
          as={motion.div}
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'xl'}
          rounded={'2xl'}
          pos={'relative'}
          zIndex={1}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 } as any}
        >
          <Box
            rounded={'2xl'}
            mt={-12}
            pos={'relative'}
            height={'200px'}
            bg={useColorModeValue('gray.50', 'gray.700')}
            p={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="inner"
            _groupHover={{
               bg: `${badgeColor}.50`
            }}
            transition="all 0.3s"
          >
            <Box
               as={motion.div}
               whileHover={{ scale: 1.15, rotate: 5 }}
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
                filter="drop-shadow(0px 10px 10px rgba(0,0,0,0.15))"
              />
            </Box>
          </Box>
          <Stack pt={10} align={'center'} flex={1} justify="flex-end">
            <Badge colorScheme={badgeColor} mb={2} px={3} py={1} rounded="full" textTransform="uppercase">{product.category}</Badge>
            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={700} textAlign="center" textTransform="capitalize">
              {product.title}
            </Heading>
            <Stack direction={'row'} align={'center'} mt={2}>
              <Text fontWeight={800} fontSize={'3xl'} color="red.500">
                ${product.price.toFixed(2)}
              </Text>
            </Stack>
            <Button 
              w="full" 
              mt={4} 
              bg="red.500" 
              color="white" 
              rounded="full"
              fontWeight="bold"
              _hover={{ bg: 'red.600', transform: 'scale(1.02)' }}
              _active={{ transform: 'scale(0.98)' }}
              transition="all 0.2s"
              onClick={() => addToCart(product)}
            >
              Añadir a la PokéDex
            </Button>
          </Stack>
        </Box>
    </Center>
  );
};

export default function ProductList({ searchQuery, selectedCategory }: ProductListProps) {
  const { products, loading, error } = usePokemonList(151);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} py={10} id="productos">
      <Container maxW={'7xl'}>
        <Heading textAlign="center" mb={2} fontSize="4xl" fontWeight="extrabold">
          Catálogo Pokémon
        </Heading>
        <Text textAlign="center" color="gray.500" mb={8} fontSize="lg">
          {searchQuery ? `Resultados para "${searchQuery}"` : 'Elige a tus compañeros'}
        </Text>

        {loading ? (
          <Center py={20} flexDir="column">
            <Spinner size="xl" color="red.500" thickness="4px" speed="0.65s" />
            <Text mt={4} color="gray.500" fontWeight="bold">Conectando con el PC de Bill...</Text>
          </Center>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <Center py={20}>
                <Text fontSize="xl" color="gray.500">No se encontraron Pokémon.</Text>
              </Center>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" animate="show">
                <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={8}>
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </SimpleGrid>
              </motion.div>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

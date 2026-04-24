import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface HeroProps {
  navigate: (page: 'home' | 'legendaries') => void;
}

export default function Hero({ navigate }: HeroProps) {
  return (
    <Container maxW={'7xl'} overflow="hidden">
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}>
        
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Box
            as={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" } as any}
          >
            <Heading
              lineHeight={1.1}
              fontWeight={800}
              fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'yellow.400',
                  zIndex: -1,
                }}>
                ¡Atrápalos a todos
              </Text>
              <br />
              <Text as={'span'} color={'red.500'}>
                al mejor precio!
              </Text>
            </Heading>
          </Box>
          
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 } as any}
          >
            <Text 
              color={'gray.600'} 
              fontSize={'xl'}
            >
              Bienvenido a <b>Aura PokeMart</b>. Encuentra a tus compañeros ideales para la aventura. Desde tipo Fuego hasta Eléctrico, tenemos el catálogo más completo de la región.
            </Text>
          </Box>
          
          <Box
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 } as any}
          >
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'bold'}
                px={8}
                colorScheme={'red'}
                bg={'red.500'}
                _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                transition="all 0.2s"
                onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ir a la Tienda
              </Button>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'bold'}
                px={8}
                leftIcon={<Box as="span" mr={2}>✨</Box>}
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
                onClick={() => navigate('legendaries')}
              >
                Ver Legendarios
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}>
          <Box
            as={motion.div}
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" } as any}
            position={'relative'}
            height={{ base: '300px', md: '500px' }}
            width={'full'}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* Círculo de fondo animado */}
            <Box
               as={motion.div}
               position="absolute"
               width={{ base: '250px', md: '400px' }}
               height={{ base: '250px', md: '400px' }}
               bgGradient="radial(yellow.300, transparent)"
               borderRadius="full"
               filter="blur(40px)"
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
               transition={{ repeat: Infinity, duration: 3 } as any}
               zIndex={-1}
            />
            <Image
              alt={'Pikachu Hero'}
              objectFit={'contain'}
              w={'90%'}
              h={'90%'}
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'}
              filter="drop-shadow(0px 20px 30px rgba(0,0,0,0.3))"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

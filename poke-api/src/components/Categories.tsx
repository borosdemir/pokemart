import { Box, SimpleGrid, Icon, Text, Flex, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaFire, FaTint, FaLeaf, FaBolt, FaMagic } from 'react-icons/fa';

interface FeatureProps {
  title: string;
  icon: React.ReactElement;
  isActive: boolean;
  onClick: () => void;
  colorScheme: string;
}

const Feature = ({ title, icon, isActive, onClick, colorScheme }: FeatureProps) => {
  return (
    <Flex
      as={motion.div}
      direction="column"
      align={'center'}
      bg={isActive ? `${colorScheme}.50` : 'white'}
      p={6}
      rounded="2xl"
      onClick={onClick}
      borderWidth="2px"
      borderColor={isActive ? `${colorScheme}.400` : 'gray.100'}
      whileHover={{ y: -10, scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.95 }}
      cursor="pointer"
      boxShadow="sm"
    >
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={isActive ? 'white' : `${colorScheme}.500`}
        rounded={'full'}
        bg={isActive ? `${colorScheme}.400` : `${colorScheme}.50`}
        mb={3}
        transition="all 0.3s"
      >
        {icon}
      </Flex>
      <Text fontWeight={700} color={isActive ? `${colorScheme}.600` : 'gray.600'}>
        {title}
      </Text>
    </Flex>
  );
};

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onSelectCategory(null);
    } else {
      onSelectCategory(category);
    }
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Box p={10} maxW="7xl" mx="auto" position="relative" zIndex={2}>
      <Heading textAlign="center" mb={10} fontSize="4xl" color="gray.800" fontWeight="extrabold">
        Filtra por Tipo
      </Heading>
      
      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={8}>
          <motion.div variants={itemVariants}>
            <Feature
              icon={<Icon as={FaFire} w={8} h={8} />}
              title={'Fuego'}
              colorScheme="orange"
              isActive={selectedCategory === 'Fuego'}
              onClick={() => handleCategoryClick('Fuego')}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Feature
              icon={<Icon as={FaTint} w={8} h={8} />}
              title={'Agua'}
              colorScheme="blue"
              isActive={selectedCategory === 'Agua'}
              onClick={() => handleCategoryClick('Agua')}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Feature
              icon={<Icon as={FaLeaf} w={8} h={8} />}
              title={'Planta'}
              colorScheme="green"
              isActive={selectedCategory === 'Planta'}
              onClick={() => handleCategoryClick('Planta')}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Feature
              icon={<Icon as={FaBolt} w={8} h={8} />}
              title={'Eléctrico'}
              colorScheme="yellow"
              isActive={selectedCategory === 'Eléctrico'}
              onClick={() => handleCategoryClick('Eléctrico')}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Feature
              icon={<Icon as={FaMagic} w={8} h={8} />}
              title={'Psíquico'}
              colorScheme="purple"
              isActive={selectedCategory === 'Psíquico'}
              onClick={() => handleCategoryClick('Psíquico')}
            />
          </motion.div>
        </SimpleGrid>
      </motion.div>
    </Box>
  );
}

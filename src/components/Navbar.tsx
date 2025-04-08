import { Box, Container, Flex, Button, Image, Link, useColorModeValue, IconButton, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box 
      as="nav" 
      position="sticky" 
      top={0} 
      zIndex={1000} 
      bg={bgColor} 
      borderBottom="1px" 
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Container maxW="container.xl" py={3}>
        <Flex align="center" justify="space-between">
          <Link 
            as={RouterLink} 
            to="/" 
            _hover={{ textDecoration: 'none' }}
            display="flex"
            alignItems="center"
          >
            <Image
              src="/Lovely_Professional_University_logo.png"
              alt="LPU Logo"
              h="45px"
              w="45px"
              mr={3}
              borderRadius="full"
              objectFit="contain"
              bg={useColorModeValue('white', 'gray.700')}
              p={1}
            />
            <Box 
              fontSize={{ base: "lg", md: "xl" }} 
              fontWeight="bold" 
              color="orange.500"
              display={{ base: 'none', md: 'block' }}
            >
              Daily Challenge Bot
            </Box>
          </Link>

          <Flex gap={{ base: 2, md: 4 }} align="center">
            <IconButton
              as={RouterLink}
              to="/"
              icon={<FaHome />}
              aria-label="Home"
              variant="ghost"
              colorScheme="orange"
              size={{ base: 'sm', md: 'md' }}
              isActive={isActive('/')}
              _active={{
                bg: 'orange.100',
                color: 'orange.500'
              }}
            />
            <Link
              as={RouterLink}
              to="/about"
              px={3}
              py={2}
              rounded="md"
              fontWeight="medium"
              color={isActive('/about') ? 'orange.500' : useColorModeValue('gray.600', 'gray.300')}
              bg={isActive('/about') ? useColorModeValue('orange.50', 'rgba(237, 137, 54, 0.1)') : 'transparent'}
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('orange.50', 'rgba(237, 137, 54, 0.1)'),
                color: 'orange.500'
              }}
            >
              About
            </Link>
            <Button
              as={RouterLink}
              to="/login"
              variant="ghost"
              colorScheme="orange"
              size={{ base: 'sm', md: 'md' }}
            >
              Login
            </Button>
            <Button
              as={RouterLink}
              to="/signup"
              colorScheme="orange"
              size={{ base: 'sm', md: 'md' }}
            >
              Sign Up
            </Button>
            <IconButton
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              variant="ghost"
              colorScheme="orange"
              size={{ base: 'sm', md: 'md' }}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar; 
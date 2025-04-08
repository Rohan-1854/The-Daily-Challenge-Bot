import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
  Image,
  Checkbox,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const boxShadow = useColorModeValue('md', 'dark-lg');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (!acceptedTerms) {
      toast({
        title: 'Error',
        description: 'Please accept the terms and conditions',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Account created',
        description: 'Welcome to Daily Challenge Bot!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 1500);
  };

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Image
            src="/Lovely_Professional_University_logo.png"
            alt="LPU Logo"
            boxSize="80px"
            objectFit="contain"
            bg={useColorModeValue('white', 'gray.700')}
            p={1}
            borderRadius="full"
          />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }} color={labelColor}>
              Create your account
            </Heading>
            <Text color={textColor}>
              Already have an account?{' '}
              <Link as={RouterLink} to="/login" color="orange.500">
                Sign in
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: bgColor }}
          boxShadow={{ base: 'none', sm: boxShadow }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <Stack spacing="5">
                <HStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel htmlFor="firstName" color={labelColor}>First Name</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      _placeholder={{ color: textColor }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="lastName" color={labelColor}>Last Name</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      _placeholder={{ color: textColor }}
                    />
                  </FormControl>
                </HStack>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" color={labelColor}>Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    _placeholder={{ color: textColor }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password" color={labelColor}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      _placeholder={{ color: textColor }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        color={textColor}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="confirmPassword" color={labelColor}>Confirm Password</FormLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    _placeholder={{ color: textColor }}
                  />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Checkbox
                  colorScheme="orange"
                  isChecked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  color={textColor}
                >
                  I accept the terms and conditions
                </Checkbox>
                <Button
                  colorScheme="orange"
                  isLoading={isLoading}
                  loadingText="Creating account..."
                  type="submit"
                >
                  Create Account
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Signup; 
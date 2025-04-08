import { Box, Container, Grid, Heading, Text, Image, VStack, Link, useColorModeValue, SimpleGrid, Center } from '@chakra-ui/react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rohan Raj",
    role: "Project Guide",
    image: "https://avatars.githubusercontent.com/u/150837450?v=4"
  },
  {
    name: "Divya Raj Singh",
    role: "Project Lead & Developer",
    image: "https://avatars.githubusercontent.com/u/146539466?v=4"
  },
  {
    name: "Ayushi Kumari",
    role: "UI/UX Designer",
    image: "https://avatars.githubusercontent.com/u/152266955?v=4"
  }
];

const About = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={16} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4} color="orange.500">
            About Daily Challenge Bot
          </Heading>
          <Text fontSize="xl" color={textColor} maxW="2xl" mx="auto">
            Your AI-powered companion for personalized challenges and growth
          </Text>
        </Box>

        {/* Mission Section */}
        <Box textAlign="center">
          <Heading as="h2" size="xl" mb={6} color="orange.500">
            Our Mission
          </Heading>
          <Text fontSize="lg" color={textColor} maxW="3xl" mx="auto">
            We believe in holistic development. Through our AI-powered challenge platform, 
            we empower students to excel in academics, coding, fitness, and personal growth, creating well-rounded professionals 
            ready to make their mark in the world.
          </Text>
        </Box>

        {/* Team Section */}
        <Box>
          <Heading as="h2" size="xl" mb={12} textAlign="center" color="orange.500">
            Meet Our Team
          </Heading>
          <Center>
            <SimpleGrid 
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 8, lg: 12 }}
              maxW="4xl"
              mx="auto"
            >
              {teamMembers.map((member, index) => (
                <VStack
                  key={index}
                  p={6}
                  bg={bgColor}
                  borderRadius="xl"
                  shadow="lg"
                  spacing={4}
                  transition="all 0.3s"
                  _hover={{ 
                    transform: 'translateY(-5px)',
                    shadow: 'xl'
                  }}
                  minW="250px"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    borderRadius="full"
                    boxSize="150px"
                    objectFit="cover"
                  />
                  <Heading as="h3" size="md" color="orange.500">
                    {member.name}
                  </Heading>
                  <Text color={textColor}>{member.role}</Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Center>
        </Box>
      </VStack>
    </Container>
  );
};

export default About; 
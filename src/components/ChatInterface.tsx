import { Box, VStack, Input, Button, Text, Flex, useToast, Container, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import { getChallengeResponse } from '../services/api'

type Message = {
  text: string
  isBot: boolean
}

interface ChatInterfaceProps {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const ChatInterface = ({ messages, setMessages }: ChatInterfaceProps) => {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      toast({
        title: 'API Key Missing',
        description: 'Please set your Gemini API key in the .env file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setError(null)
    // Add user message
    setMessages(prev => [...prev, { text: input.trim(), isBot: false }])
    const userInput = input.trim()
    setInput('')
    setIsLoading(true)

    try {
      const response = await getChallengeResponse(userInput)
      setMessages(prev => [...prev, { text: response.text, isBot: true }])
    } catch (error: any) {
      console.error('Chat Error:', error)
      const errorMessage = error.message || 'Failed to generate challenge. Please try again.'
      setError(errorMessage)
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setMessages(prev => [...prev, {
        text: "I'm having trouble generating a challenge right now. Please try again later.",
        isBot: true
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Container maxW="container.lg" py={4}>
      {(!apiKey || apiKey === 'your_gemini_api_key_here') && (
        <Alert status="warning" mb={4} borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>API Key Not Configured</AlertTitle>
            <AlertDescription>
              Please set your Gemini API key in the .env file to enable chat functionality.
            </AlertDescription>
          </Box>
        </Alert>
      )}
      {error && (
        <Alert status="error" mb={4} borderRadius="lg">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack spacing={4} align="stretch" h="70vh">
        <Box
          flex="1"
          overflowY="auto"
          p={4}
          borderRadius="lg"
          bg="white"
          boxShadow="sm"
        >
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.isBot ? 'flex-start' : 'flex-end'}
              mb={4}
            >
              <Box
                maxW="80%"
                bg={message.isBot ? 'gray.100' : 'orange.500'}
                color={message.isBot ? 'gray.800' : 'white'}
                p={3}
                borderRadius="lg"
                whiteSpace="pre-wrap"
              >
                <Text>{message.text}</Text>
              </Box>
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </Box>
        <Flex>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            mr={2}
          />
          <Button
            colorScheme="orange"
            onClick={handleSendMessage}
            isLoading={isLoading}
            disabled={isLoading}
            loadingText="Generating..."
          >
            <FiSend />
          </Button>
        </Flex>
      </VStack>
    </Container>
  )
}

export default ChatInterface 
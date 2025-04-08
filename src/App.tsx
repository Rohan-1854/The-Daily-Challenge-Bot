import { Box, useColorModeValue } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import ChatInterface from './components/ChatInterface'
import Login from './components/Login'
import Signup from './components/Signup'
import About from './pages/About'

type Message = {
  text: string
  isBot: boolean
}

const App = () => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `👋 Welcome to LPU Challenge Bot! Ready to level up your life? 🚀

I'm your personal growth companion, and I've got some exciting challenges for you:

🧠 Coding - Sharpen your programming skills
💪 Fitness - Get moving and feel amazing
📚 Learning - Expand your knowledge
⏰ Productivity - Boost your efficiency
🧘 Mindfulness - Find your inner peace

Just tell me what interests you, and I'll create a personalized challenge to help you grow! What would you like to tackle today?`,
      isBot: true,
    },
  ])

  return (
    <Router>
      <Box minH="100vh" bg={bg} color={useColorModeValue('gray.800', 'white')}>
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatInterface messages={messages} setMessages={setMessages} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App 
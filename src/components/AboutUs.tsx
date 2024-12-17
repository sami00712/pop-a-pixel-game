import { X } from 'lucide-react'

interface AboutUsProps {
  onClose: () => void
}

const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="mb-4">
          Welcome to Pop-a-Pixel, a fun and addictive game that challenges your reflexes and hand-eye coordination!
        </p>
        <h3 className="text-xl font-semibold mb-2">Our Story</h3>
        <p className="mb-4">
          Pop-a-Pixel was created by a small team of passionate game developers who wanted to bring joy and excitement to people's daily lives. Our goal was to create a simple yet engaging game that anyone could play, regardless of age or gaming experience.
        </p>
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p className="mb-4">
          At Pop-a-Pixel, our mission is to provide a fun, accessible, and challenging gaming experience that helps people take short breaks and improve their reflexes. We believe that even a quick game session can brighten someone's day and provide a moment of relaxation.
        </p>
        <h3 className="text-xl font-semibold mb-2">The Game</h3>
        <p className="mb-4">
          Pop-a-Pixel is a modern take on the classic whack-a-mole game. Players must click on randomly appearing blue squares as quickly as possible to score points. With its simple design and addictive gameplay, Pop-a-Pixel is perfect for short gaming sessions or longer challenges to beat your high score.
        </p>
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <p>
          We love hearing from our players! If you have any questions, suggestions, or just want to say hello, please don't hesitate to reach out to us at hello@popapixel.com.
        </p>
      </div>
    </div>
  )
}

export default AboutUs


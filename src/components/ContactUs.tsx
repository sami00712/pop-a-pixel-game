import { useState } from 'react'
import { X, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

interface ContactUsProps {
  onClose: () => void
}

const ContactUs: React.FC<ContactUsProps> = ({ onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
    // Optionally, show a success message to the user
    alert('Thank you for your message. We will get back to you soon!')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Contact Us</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src="/mypic.jpg"
              alt="Developer"
              className="w-52 h-auto rounded-lg shadow-md mb-4"
            />
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="mr-2 text-blue-600" size={20} />
                <span>+92 (333) 3739199</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 text-blue-600" size={20} />
                <span>samiqaimkhani@gmail.com</span>
             </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/skpro0786/" className="text-blue-600 hover:text-blue-800 hover:scale-125">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <Twitter size={24} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-sami-359601281/" className="text-blue-700 hover:text-blue-900 hover:scale-125">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 ">
            <form onSubmit={handleSubmit} className="space-y-4 shadow-lg p-2 shadow-slate-300">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs


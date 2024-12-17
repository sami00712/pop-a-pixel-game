import { X } from 'lucide-react'

interface PrivacyPolicyProps {
  onClose: () => void
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
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
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">
          At Pop-a-Pixel, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>
        <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
        <p className="mb-4">
          We do not collect any personal information from you when you play Pop-a-Pixel. The game is played entirely in your browser, and no data is sent to our servers.
        </p>
        <h3 className="text-xl font-semibold mb-2">2. Use of Cookies</h3>
        <p className="mb-4">
          We do not use cookies or any other tracking technologies on our website.
        </p>
        <h3 className="text-xl font-semibold mb-2">3. Third-Party Links</h3>
        <p className="mb-4">
          Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
        </p>
        <h3 className="text-xl font-semibold mb-2">4. Changes to This Privacy Policy</h3>
        <p className="mb-4">
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
        </p>
        <h3 className="text-xl font-semibold mb-2">5. Contact Us</h3>
        <p>
          If you have any questions about this privacy policy, please contact us at privacy@popapixel.com.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy


'use client'

import { useState, useEffect, useCallback } from 'react'
import { Share2, Pause, Play, X, Trophy } from 'lucide-react'
import PrivacyPolicy from './PrivacyPolicy'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'

const GAME_DURATION = 30000 // 30 seconds
const GRID_SIZE = 4 // 4x4 grid

const LEVELS = [
  { requiredScore: 6, pixelInterval: 1000 },
  { requiredScore: 10, pixelInterval: 900 },
  { requiredScore: 15, pixelInterval: 800 },
  { requiredScore: 20, pixelInterval: 700 },
  { requiredScore: 25, pixelInterval: 600 },
  { requiredScore: 30, pixelInterval: 500 },
  { requiredScore: 35, pixelInterval: 400 },
  { requiredScore: 40, pixelInterval: 300 },
  { requiredScore: 45, pixelInterval: 200 },
  { requiredScore: 50, pixelInterval: 100 },
]

const PopAPixel = () => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000)
  const [activePixel, setActivePixel] = useState<number | null>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showAboutUs, setShowAboutUs] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [levelCompleted, setLevelCompleted] = useState(false)
  const [levelFailed, setLevelFailed] = useState(false)
  const [showContactUs, setShowContactUs] = useState(false)

  const startGame = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION / 1000)
    setGameStarted(true)
    setGamePaused(false)
    setCurrentLevel(0)
    setLevelCompleted(false)
    setLevelFailed(false)
  }

  const startNextLevel = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION / 1000)
    setCurrentLevel(prev => prev + 1)
    setLevelCompleted(false)
    setLevelFailed(false)
    setGamePaused(false)
  }

  const retryLevel = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION / 1000)
    setLevelFailed(false)
    setGamePaused(false)
  }

  const togglePause = () => {
    setGamePaused(prev => !prev)
  }

  const exitGame = () => {
    setGameStarted(false)
    setCurrentLevel(0)
    setScore(0)
    setLevelCompleted(false)
    setLevelFailed(false)
  }

  const endGame = useCallback(() => {
    setGameStarted(false)
    setActivePixel(null)
    setCurrentLevel(0)
    setScore(0)
    setLevelCompleted(false)
    setLevelFailed(false)
  }, [])

  const popPixel = (index: number) => {
    if (index === activePixel && !gamePaused && !levelCompleted && !levelFailed) {
      setScore((prevScore) => {
        const newScore = prevScore + 1
        if (newScore >= LEVELS[currentLevel].requiredScore) {
          setLevelCompleted(true)
          setGamePaused(true)
        }
        return newScore
      })
      setActivePixel(null)
    }
  }

  const shareGame = () => {
    const shareData = {
      title: 'Pop-a-Pixel',
      text: `Check out this fun game! I reached level ${currentLevel + 1} with a score of ${score}!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => {
          console.log('Error sharing:', error);
          fallbackShare();
        });
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const shareText = `Check out Pop-a-Pixel! I reached level ${currentLevel + 1} with a score of ${score}. Play now at ${window.location.href}`;

    const tempInput = document.createElement('input');
    tempInput.value = shareText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Share text copied to clipboard: ' + shareText);
  };

  useEffect(() => {
    if (!gameStarted || gamePaused) return

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          if (score < LEVELS[currentLevel].requiredScore) {
            setLevelFailed(true)
          } else {
            setLevelCompleted(true)
          }
          setGamePaused(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gamePaused, score, currentLevel])

  useEffect(() => {
    if (!gameStarted || gamePaused) return

    const pixelTimer = setInterval(() => {
      setActivePixel(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)))
    }, LEVELS[currentLevel].pixelInterval)

    return () => clearInterval(pixelTimer)
  }, [gameStarted, gamePaused, currentLevel])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Pop-a-Pixel</h1>
      {!gameStarted ? (
        <div className="space-y-4">
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Start Game
          </button>
          <button
            onClick={() => setShowPrivacyPolicy(true)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setShowAboutUs(true)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            About Us
          </button>
          <button
            onClick={() => setShowContactUs(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Contact Us
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-center">
            <div className="font-bold text-lg">Level: {currentLevel + 1}</div>
            <div>Score: {score} / {LEVELS[currentLevel].requiredScore}</div>
            <div>Time Left: {timeLeft}s</div>
          </div>
          {levelCompleted ? (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-green-600 mb-2 flex items-center justify-center">
                <Trophy className="mr-2" /> Congratulations! You completed Level {currentLevel + 1}!
              </h2>
              {currentLevel < LEVELS.length - 1 ? (
                <button
                  onClick={startNextLevel}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next Level
                </button>
              ) : (
                <p className="text-xl font-bold text-blue-600">You've completed all levels!</p>
              )}
            </div>
          ) : levelFailed ? (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                Try Again! You didn't reach the required score.
              </h2>
              <button
                onClick={retryLevel}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Retry Level
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => popPixel(index)}
                  className={`w-16 h-16 rounded-lg transition-colors duration-200 ${
                    activePixel === index
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  disabled={gamePaused}
                />
              ))}
            </div>
          )}
          <div className="mt-4 flex space-x-4">
            <button
              onClick={togglePause}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              {gamePaused ? <Play size={24} /> : <Pause size={24} />}
            </button>
            <button
              onClick={exitGame}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <X size={24} />
            </button>
          </div>
        </>
      )}
      <button
        onClick={shareGame}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full"
        aria-label="Share"
      >
        <Share2 size={24} />
      </button>
      {showPrivacyPolicy && <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />}
      {showAboutUs && <AboutUs onClose={() => setShowAboutUs(false)} />}
      {showContactUs && <ContactUs onClose={() => setShowContactUs(false)} />}
    </div>
  )
}

export default PopAPixel


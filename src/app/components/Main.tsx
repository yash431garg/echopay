"use client";

import { FarcasterActions } from "./FarcasterAction";
import { WalletActions } from "./WalletActions";

import { User } from './User'
import { useState } from "react"
import { MicrophoneIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { transactionMappings } from "../utils/transactionMappings"
import { useTransactionStore } from "../store/transactionStore"

export default function Main() {
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const setTransaction = useTransactionStore((state) => state.setTransaction)

  const handleVoiceInput = async () => {
    setIsListening(true)
    try {
      const response = await fetch('/api/voice', { method: 'POST' })
      const data = await response.json()

      if (data.error) {
        console.error('Error:', data.error)
        return
      }

      // Set the transcribed text in the input field
      setInputText(data.transcript || '')

      // Log both the transcript and parsed result
      console.log('Voice transcript:', data.transcript)
      console.log('Parsed transaction:', data.parsed)

    } catch (error) {
      console.error('Error processing voice input:', error)
    } finally {
      setIsListening(false)
    }
  }

  const handleParseInput = async () => {
    if (!inputText.trim()) return;

    try {
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })
      const data = await response.json()
      console.log('Transaction parsed:', data)
      if (data.error) {
        console.error('Error:', data.error)
      }
    } catch (error) {
      console.error('Error parsing input:', error)
    }
  }

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleParseInput()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50 mt-300">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#4066E0] to-[#834EE3] relative overflow-hidden">
        {/* Glassmorphism elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>

        {/* Header Content */}
        <div className="relative backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/95 backdrop-blur-xl rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-[#4066E0] rounded-lg"></div>
              </div>
              <h1 className="text-3xl font-bold text-white">EchoPay</h1>
            </div>
            <div className="w-full text-center">
              <p className="text-white/90 text-sm font-medium tracking-wide inline-flex items-center gap-3">
                <span>Seamless</span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span>Secure</span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span>Swift</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md mx-auto px-4 space-y-12">
          {/* Voice Input Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleVoiceInput}
              disabled={isListening}
              className="group relative w-20 h-20 rounded-full bg-gradient-to-br from-[#4066E0] to-[#834EE3] p-[1px] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(64,102,224,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-95 disabled:opacity-50"
              aria-label="Voice Input"
            >
              <span className="absolute inset-1 rounded-full bg-gradient-to-br from-[#4066E0] to-[#834EE3] blur-xl opacity-0 group-hover:opacity-60 transition-opacity"></span>
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#4066E0] to-[#834EE3] flex items-center justify-center">
                <MicrophoneIcon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </button>
            {isListening && (
              <span className="text-sm font-medium text-[#4066E0] animate-pulse">
                Listening...
              </span>
            )}
          </div>

          {/* Text Input */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4066E0] to-[#834EE3] rounded-full blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Execute transaction..."
                className="flex-1 h-12 px-6 rounded-full bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(64,102,224,0.12)] border border-[#4066E0]/10 focus:border-[#4066E0] focus:ring-4 focus:ring-[#4066E0]/10 outline-none transition-all duration-200 text-gray-700"
              />
              <button
                onClick={handleParseInput}
                className="h-12 w-12 rounded-full bg-gradient-to-br from-[#4066E0] to-[#834EE3] flex items-center justify-center text-white shadow-lg hover:shadow-[0_8px_30px_rgb(64,102,224,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Component */}
          <div className="bg-white/80 backdrop-blur-sm shadow-[0_4px_20px_rgba(64,102,224,0.12)] rounded-2xl p-4 border border-[#4066E0]/5 hover:border-[#4066E0]/10 transition-colors duration-300">
            <User />
          </div>
        </div>
      </div>
    </div>
  )
}

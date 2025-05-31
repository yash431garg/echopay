"use client"

import { useState } from "react"

export const User = () => {
    const [userAddress, setUserAddress] = useState<string>("")

    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4066E0] to-[#834EE3] rounded-full blur-md opacity-25"></div>
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#4066E0]/90 to-[#834EE3]/90 backdrop-blur-sm flex items-center justify-center text-white font-medium border border-white/20">
                    ?
                </div>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500">Connected Account</p>
                <p className="text-[#4066E0] font-medium tracking-wide text-sm">
                    Not Connected
                </p>
            </div>
        </div>
    )
}

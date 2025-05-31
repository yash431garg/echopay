"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { monadTestnet } from "viem/chains";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useSendTransaction,
    useSwitchChain,
} from "wagmi";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { useMiniAppContext } from "../hooks/useMiniAppContext";

export function User() {
    const { isEthProviderAvailable, context } = useMiniAppContext();
    const { isConnected, address, chainId } = useAccount();
    const { disconnect } = useDisconnect();
    const { data: hash, sendTransaction } = useSendTransaction();
    const { switchChain } = useSwitchChain();
    const { connect } = useConnect();

    async function sendTransactionHandler() {
        sendTransaction({
            to: "0x7f748f154B6D180D35fA12460C7E4C631e28A9d7",
            value: parseEther("1"),
        });
    }

    return (
        <div className="max-w-md mx-auto p-4 space-y-6">
            {/* User Context Section */}
            <div className="space-y-4 border border-[#333] rounded-lg p-4 bg-[#f9fafb]">
                <div className="flex flex-row space-x-4 justify-start items-start">
                    {context?.user ? (
                        <>
                            {context?.user?.pfpUrl && (
                                <img
                                    src={context?.user?.pfpUrl}
                                    className="w-14 h-14 rounded-full border-2 border-[#4066E0]"
                                    alt="User Profile Picture"
                                    width={56}
                                    height={56}
                                />
                            )}
                            <div className="flex flex-col justify-start items-start space-y-2">
                                <p className="text-sm text-left">
                                    <span className="font-medium text-black">user.displayName:</span>{" "}
                                    <span className="bg-white font-mono text-black rounded px-2 py-1">
                                        {context?.user?.displayName}
                                    </span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-left">User context not available</p>
                    )}
                </div>
            </div>

            {/* Wallet Actions Section */}
            <div className="space-y-4 border border-[#333] rounded-lg p-4 bg-[#f9fafb]">
                <div className="flex flex-row space-x-4 justify-start items-start">
                    {isConnected ? (
                        <div className="flex flex-col space-y-4 justify-start w-full">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#4066E0] to-[#834EE3] rounded-full blur-md opacity-25"></div>
                                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#4066E0]/90 to-[#834EE3]/90 backdrop-blur-sm flex items-center justify-center text-white font-medium border border-white/20">
                                        ?
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs font-medium text-gray-500">
                                        Connected Account
                                    </p>
                                    <p className="text-[#4066E0] font-medium tracking-wide text-sm">
                                        {address?.slice(0, 6)}...{address?.slice(-4)}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-left">
                                <span className="font-medium">Chain Id:</span>{" "}
                                <span className="bg-white font-mono text-black rounded px-2 py-1">
                                    {chainId}
                                </span>
                            </p>
                            {chainId === monadTestnet.id ? (
                                <div className="flex flex-col space-y-2 border border-[#333] p-4 rounded-md bg-white">
                                    <h2 className="text-lg font-semibold text-left">
                                        Send Transaction Example
                                    </h2>
                                    <button
                                        className="bg-[#4066E0] hover:bg-[#3a5ec9] text-white rounded-md p-2 text-sm transition-colors"
                                        onClick={sendTransactionHandler}
                                    >
                                        Send Transaction
                                    </button>
                                    {hash && (
                                        <button
                                            className="bg-white border border-[#4066E0] hover:bg-[#f0f5ff] text-[#4066E0] rounded-md p-2 text-sm transition-colors"
                                            onClick={() =>
                                                window.open(
                                                    `https://testnet.monadexplorer.com/tx/${hash}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            View Transaction
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <button
                                    className="bg-[#4066E0] hover:bg-[#3a5ec9] text-white rounded-md p-2 text-sm transition-colors"
                                    onClick={() => switchChain({ chainId: monadTestnet.id })}
                                >
                                    Switch to Monad Testnet
                                </button>
                            )}
                            <button
                                className="bg-white border border-red-500 hover:bg-red-50 text-red-500 rounded-md p-2 text-sm transition-colors"
                                onClick={() => disconnect()}
                            >
                                Disconnect Wallet
                            </button>
                        </div>
                    ) : isEthProviderAvailable ? (
                        <button
                            className="bg-[#4066E0] hover:bg-[#3a5ec9] text-white rounded-md p-2 text-sm w-full transition-colors"
                            onClick={() => connect({ connector: farcasterFrame() })}
                        >
                            Connect Wallet
                        </button>
                    ) : (
                        <p className="text-sm text-left">Wallet connection only via Warpcast</p>
                    )}
                </div>
            </div>
        </div>
    );
}

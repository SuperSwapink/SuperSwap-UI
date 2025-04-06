"use client"

import { Dialog, DialogPanel, Transition } from "@headlessui/react"
import Close from "./svgs/Close"

interface SecurityAlertModalProps {
  open: boolean
  onClose: any
}

const SecurityAlertModal: React.FC<SecurityAlertModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Transition appear show={open}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={onClose}
        >
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="relative w-full max-w-xl bg-white dark:bg-[#131823] rounded-2xl backdrop-blur-2xl overflow-hidden">
                <button
                  className="flex items-center justify-center absolute w-10 h-10 top-2 right-3"
                  onClick={onClose}
                >
                  <Close className="w-3 h-3 text-[#222] dark:text-white" />
                </button>
                <p className="max-h-[500px] pt-10 p-6 overflow-y-scroll">
                  <h4 className="text-lg font-bold text-center">
                    SuperSwap Safety Guide
                  </h4>
                  <br />
                  Your security is our top priority! Follow these steps to avoid
                  phishing scams, fake sites, and malicious contracts.
                  <br />
                  <br />
                  <strong>⚠️ Watch Out for Phishing Sites!</strong>
                  <br />
                  <br />
                  ❌ Fake examples: SuperSwap.lnk (L instead of i) |
                  SueprSwap.ink | SuperSwap.exchange
                  <br />
                  <br />✅ Only trust:{" "}
                  <a href="https://SuperSwap.ink" className="text-[#2f8af5]">
                    SuperSwap.ink
                  </a>
                  <br />
                  <br />
                  <strong>Smart Contract:</strong>
                  <br />
                  <br />
                  Swaps interact only with:
                  <br />
                  <br />
                  INK
                  <br />
                  <a
                    href="https://explorer.inkonchain.com/address/0x5839389261D1F38aac7c8E91DcDa85646bEcB414"
                    className="text-[#2f8af5]"
                  >
                    0x5839389261D1F38aac7c8E91DcDa85646bEcB414
                  </a>
                  <br />
                  <a
                    href="https://explorer.inkonchain.com/address/0xA0Df240629db93d2f88D86a5456F982848bE2B9D"
                    className="text-[#2f8af5]"
                  >
                    0xA0Df240629db93d2f88D86a5456F982848bE2B9D
                  </a>
                  <br />
                  <br />
                  BASE
                  <br />
                  <a
                    href="https://basescan.org/address/0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB"
                    className="text-[#2f8af5]"
                  >
                    0x78e7Bb4D66505D25Cef212Ce49A64261d6f1CddB
                  </a>
                  <br />
                  <a
                    href="https://basescan.org/address/0x0A5803a9341BC7c67EA51188F1dCE52A0B6F0EE4"
                    className="text-[#2f8af5]"
                  >
                    0x0A5803a9341BC7c67EA51188F1dCE52A0B6F0EE4
                  </a>
                  <br />
                  <br />
                  Token approvals interact with the token’s contract but must
                  grant access only to our contract above.
                  <br />
                  <br />
                  <br />
                  <strong>🔒 Stay Safe</strong>
                  <br />
                  <br />
                  ✔️ Verify contracts before signing
                  <br />
                  ✔️ Avoid fake links & DMs
                  <br />
                  ✔️ Use secure wallets (Rabby)
                  <br />
                  ✔️ Check approvals with{" "}
                  <a href="https://revoke.cash/" className="text-[#2f8af5]">
                    Revoke.cash
                  </a>
                  <br />
                  <br />
                  <strong>🚫 SuperSwap Will Never:</strong>
                  <br />
                  <br />
                  ❌ Ask for your private keys
                  <br />
                  ❌ Request funds via DMs
                  <br />
                  ❌ Use any other contract
                  <br />
                  <br />
                  <strong>✉️ Our only official Email:</strong>
                  <br />
                  <br />
                  <a
                    href="mailto:Team@SuperSwap.ink"
                    className="text-[#2f8af5]"
                  >
                    Team@SuperSwap.ink
                  </a>
                  <br />
                  <br />
                  Stay safe & trade securely!
                </p>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default SecurityAlertModal

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
                <p className="max-h-[500px] p-6 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                  And for safety page window text:
                  <br />
                  <br />
                  SuperSwap Safety Guide
                  <br />
                  <br />
                  Your security is our top priority! Follow these steps to avoid
                  phishing scams, fake sites, and malicious contracts.
                  <br />
                  <br />
                  Beware of scams! Always use the official site:
                  <br />
                  <br />
                  <a href="https://SuperSwap.ink" className="text-[#2f8af5]">
                    SuperSwap.ink/...........
                  </a>
                  <br />
                  <br />
                  ⚠️ Watch Out for Phishing Sites!
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
                  <br />
                  Smart Contract:
                  <br />
                  <br />
                  Swaps interact only with:
                  <br />
                  <br />
                  <a
                    href="https://explorer.inkonchain.com/address/0x5839389261D1F38aac7c8E91DcDa85646bEcB414"
                    className="text-[#2f8af5]"
                  >
                    0x5839389261D1F38aac7c8E91DcDa85646bEcB414
                  </a>
                  <br />
                  <br />
                  Token approvals interact with the token’s contract but must
                  grant access only to our contract above.
                  <br />
                  <br />
                  <br />
                  🔒 Stay Safe
                  <br />
                  <br />
                  ✔️ Verify contracts before signing
                  <br />
                  ✔️ Avoid fake links & DMs
                  <br />
                  ✔️ Use secure wallets (Rabby)
                  <br />
                  ✔️ Check approvals with Revoke.cash (https://revoke.cash/)
                  <br />
                  <br />
                  🚫 SuperSwap Will Never:
                  <br />
                  <br />
                  ❌ Ask for your private keys
                  <br />
                  ❌ Request funds via DMs
                  <br />
                  ❌ Use any other contract
                  <br />
                  <br />
                  ✉️ Our only official Email:
                  <br />
                  <br />
                  <a
                    href="mailto:Team@SuperSwap.ink"
                    className="text-[#2f8af5]"
                  >Team@SuperSwap.ink</a>
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

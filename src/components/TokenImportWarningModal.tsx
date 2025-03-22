import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react"
import ExternalLink from "./svgs/ExternalLink"
import Clipboard from "./svgs/Clipboard"
import Alert from "./svgs/Alert"
import Link from "next/link"
import { useAccount } from "wagmi"
import { Chain, ChainId, isChainId } from "@/packages/chain"
import { Type } from "@/packages/currency"

interface TokenImportWarningModalProps {
  token: Type
  onConfirm: any
  open: boolean
  onClose: any
  isCustom?: number
  className?: string
}

const TokenImportWarningModal: React.FC<TokenImportWarningModalProps> = ({
  token,
  onConfirm,
  open,
  onClose,
  isCustom,
  className,
}) => {
  const { chainId } = useAccount()
  const onCopy = () => {
    window.navigator.clipboard.writeText(token.wrapped.address)
  }

  return (
    <Transition appear show={open}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {}}
      >
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg rounded-xl bg-white dark:bg-[#131823] p-6 backdrop-blur-2xl px-10 py-8">
              <div className="flex justify-center">
                <Alert className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#222] dark:text-white text-center mt-2">
                Trade at your own risk!
              </h3>
              <p className="mt-2 text-sm text-[#222] dark:text-white text-center">
                {isCustom === 1 ? (
                  <>
                    Anyone can create a token, including creating fake versions
                    of existing tokens that claim to represent projects.
                    <br />
                    <br />
                    <strong>
                      If you purchase this token, you may not be able to sell it
                      back or it might be a scam.
                    </strong>
                  </>
                ) : (
                  <>
                    You are importing this token from the CoinGecko list. While
                    CoinGecko is a trusted source, Always do your own research
                    and be aware of the risks associated with this or any token.
                  </>
                )}
              </p>
              <div className="flex overflow-hidden cursor-pointer bg-[#2f8af529] py-1 px-2 rounded-lg text-[#6c86ad] mt-3">
                <Link
                  href={`${Chain.fromChainId(token.chainId).getTokenUrl(
                    token.wrapped.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center overflow-hidden hover:brightness-75 transition-all"
                >
                  <span className="overflow-hidden text-ellipsis text-sm">
                    {Chain.fromChainId(token.chainId).getTokenUrl(
                      token.wrapped.address
                    )}
                  </span>
                  <button className="ml-1">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </Link>
                <button
                  className="ml-1 hover:brightness-75 transition-all"
                  onClick={onCopy}
                >
                  <Clipboard className="w-4 h-4" />
                </button>
              </div>
              <button
                className="w-full bg-[#2f8af529] text-[#2f8af5] hover:bg-[#2f8af51f] py-3 rounded-xl mt-4 hover:brightness-75 transition-all"
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
              >
                I understand
              </button>
              <div className="flex justify-center">
                <button className="text-sm mt-2" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default TokenImportWarningModal

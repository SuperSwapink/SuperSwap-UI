"use client"

import WalletConnect from "../WalletConnect"
// import NetworkSelector from "../NetworkSelector"
import LogoLight from "../../assets/logo-light.svg"
import LogoDark from "../../assets/logo-dark.svg"
import LogoMbLight from "../../assets/logo-mb-light.png"
import LogoMbDark from "../../assets/logo-mb-dark.png"
import Image from "next/image"
import SettingMenu from "../SettingMenu"
import NetworkSelector from "../NetworkSelector"

const Header = () => {
  return (
    <header className="py-4">
      <div className="px-4 flex items-center w-full justify-between">
        <Image
          src={LogoLight.src}
          width={LogoLight.width}
          height={LogoLight.height}
          alt="logo"
          className="w-[160px] dark:hidden max-sm:hidden"
        />
        <Image
          src={LogoMbLight.src}
          width={LogoMbLight.width}
          height={LogoMbLight.height}
          alt="logo"
          className="w-[30px] sm:hidden dark:hidden"
        />
        <Image
          src={LogoMbDark.src}
          width={LogoMbDark.width}
          height={LogoMbDark.height}
          alt="logo"
          className="w-[30px] hidden dark:max-sm:block"
        />
        <Image
          src={LogoDark.src}
          width={LogoDark.width}
          height={LogoDark.height}
          alt="logo"
          className="w-[160px] hidden dark:sm:block"
        />
        <div className="flex items-center">
          <SettingMenu className="mr-2" />
          <NetworkSelector className="mr-2" />
          <WalletConnect />
        </div>
      </div>
    </header>
  )
}

export default Header

import React from "react"
import Help from "./svgs/Help"
import { Tooltip } from "react-tooltip"

interface HelpToolTipProps {
  id: string
  children: React.ReactNode
  className?: string
}

const HelpToolTip: React.FC<HelpToolTipProps> = ({
  id,
  children,
  className,
}) => {
  return (
    <div
      className={`relative inline-flex group cursor-pointer ${className ?? ""}`}
    >
      <span id={id} className="bg-black/10 p-0.5 rounded-full">
        <Help />
      </span>
      <Tooltip
        anchorSelect={`#${id}`}
        positionStrategy="fixed"
        place={"bottom"}
        opacity={1}
        border={"solid 1px #e8edfa"}
        className="max-w-60 !border !bg-white dark:!bg-[#131823] z-10 !text-black dark:!text-white"
      >
        {children}
      </Tooltip>
    </div>
  )
}

export default HelpToolTip

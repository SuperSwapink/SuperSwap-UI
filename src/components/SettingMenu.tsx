import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import ThreeDots from "./svgs/ThreeDots";
import Telegram from "./svgs/Telegram";
import X from "./svgs/X";
import Email from "./svgs/Email";
import MediaKit from "./svgs/MediaKit";
import { useEffect, useState } from "react";
import SecurityAlertModal from "./SecurityAlertModal";
import Alert from "./svgs/Alert";
import Github from "./svgs/Github";
import Docs from "./svgs/Docs";

interface SettingMenuProps {
  className?: string;
}

const SettingMenu: React.FC<SettingMenuProps> = ({ className }) => {
  const [showSecureModal, setShowSecureModal] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Menu>
        <MenuButton
          className={`bg-[#2f8af529] hover:bg-[#2f8af51f] rounded-xl text-[#2f8af5] px-4 py-3 outline-none ${
            className ?? ""
          }`}
        >
          <ThreeDots className="size-6" />
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={
            "mt-2 origin-top-right bg-[#d5e4fa] dark:bg-[#0f2139] py-2 px-3 rounded-lg z-100 space-y-2"
          }
        >
          <MenuItem>
            <button
              className="flex items-center text-[#2f8af5]"
              onClick={() => setShowSecureModal(true)}
            >
              <Alert className="size-4" />
              <span className="ml-1.5">Safety Guide</span>
            </button>
          </MenuItem>
          <MenuItem>
            <a
              href="https://t.me/SuperSwapink"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2f8af5]"
            >
              <Telegram className="size-4" />
              <span className="ml-1.5">Telegram</span>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="https://x.com/superswapink"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2f8af5]"
            >
              <X className="size-4" />
              <span className="ml-1.5">Twitter</span>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="https://github.com/SuperSwapink"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2f8af5]"
            >
              <Github className="size-4" />
              <span className="ml-1.5">Github</span>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="https://superswapink.gitbook.io/docs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2f8af5]"
            >
              <Docs className="size-4" />
              <span className="ml-1.5">Docs</span>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="https://superswap.notion.site/174d51a01a7780dc9cecfc68a7da6081?v=174d51a01a778171b2e1000c5c02c199&pvs=74"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2f8af5]"
            >
              <MediaKit className="size-4" />
              <span className="ml-1.5">Media Kit</span>
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="mailto:team@superswap.ink"
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-[#2f8af5]"
            >
              <Email className="size-4" />
              <span className="ml-1.5">Email</span>
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
      <SecurityAlertModal
        open={showSecureModal}
        onClose={() => setShowSecureModal(false)}
      />
    </>
  );
};

export default SettingMenu;

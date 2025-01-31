interface ThreeDotsProps {
  className?: string
}

const ThreeDots: React.FC<ThreeDotsProps> = ({ className }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 20 20"
    aria-hidden="true"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
    className={className ?? ""}
  >
    <path
      fill-rule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
      clip-rule="evenodd"
    ></path>
  </svg>
)

export default ThreeDots

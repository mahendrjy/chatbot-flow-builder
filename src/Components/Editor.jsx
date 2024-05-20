// Import the TextNode component
import TextNode from './TextNode'
import PropTypes from 'prop-types'

// Define the SVGIcon component, which renders an SVG arrow icon
const SVGIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </svg>
)

// Define the Editor component
function Editor(props) {
  // Destructure the props
  const { type, value, setValue, handleGoBack } = props

  // Depending on the type of node, render different components
  switch (type) {
    case 'messageNode':
      return (
        <>
          <div className="flex items-center p-4 mb-2 border-b-2">
            <button
              type="button"
              onClick={handleGoBack}
              className="z-50 cursor-pointer"
              aria-label="Go back"
            >
              <SVGIcon />
            </button>
            <div className="w-full -ml-6 text-center">
              Message
            </div>
          </div>
          <div className="p-4">
            <TextNode value={value} setValue={setValue} />
          </div>
        </>
      )
    default:
      // If an unknown type is encountered, render an error message
      return (
        <div className="text-red-500">
          Unknown type encountered
        </div>
      )
  }
}

// Define the prop types for the Editor component
Editor.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
}

// Export the Editor component
export default Editor

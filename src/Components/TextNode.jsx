import PropTypes from 'prop-types'

// Define the TextNode component
function TextNode({ value, setValue }) {
  // This component receives two props: value and setValue
  // value: the current value of the text area
  // setValue: a function to update the value of the text area

  return (
    <div className="space-y-2">
      {/* Render a label for the text area */}
      <label
        htmlFor="text"
        className="block text-gray-400 text-md"
      >
        Text
      </label>
      {/* Render a text area */}
      <textarea
        id="text"
        rows={4}
        className="w-full p-2 border-2 rounded-md"
        type="text"
        value={value} // The value of the text area is set to the value prop
        onChange={(e) => setValue(e.target.value)} // When the text area changes, call setValue with the new value
      />
    </div>
  )
}

// Define the prop types for the TextNode component
TextNode.propTypes = {
  value: PropTypes.string.isRequired, // The value prop is required and must be a string
  setValue: PropTypes.func.isRequired, // The setValue prop is required and must be a function
}

// Export the TextNode component
export default TextNode

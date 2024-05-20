// Import the Handle and Position components from the reactflow library
import { Handle, Position } from 'reactflow'
import PropTypes from 'prop-types'

// Define the MessageNode component
const MessageNode = (props) => {
  // Destructure the data and selected properties from the props
  const { data, selected } = props

  // If the node is selected, add a border style
  const selectedBorderStyle =
    selected && 'border-2 border-blue-500'

  // Render the node
  return (
    <div
      // Apply the selected border style if the node is selected
      className={`bg-white rounded-lg shadow-2xl w-64 ${selectedBorderStyle ?? ''}`}
    >
      {/* // Render a target handle on the left side of the node */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 mt-2 -ml-1 border-4 border-white shadow-2xl"
      />
      {/* // Render the node label */}
      <div className="w-full px-4 py-2 font-bold bg-green-200 rounded-t-lg text-md message-drag-handle">
        Send Message
      </div>
      {/* // Render a source handle on the right side of the node */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 mt-2 -mr-1 border-4 border-white shadow-2xl"
      />
      {/* // Render the message data */}
      <div className="p-3">{data.message}</div>
    </div>
  )
}

// Define the prop types for the MessageNode component
MessageNode.propTypes = {
  data: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
}

// Export the MessageNode component
export default MessageNode

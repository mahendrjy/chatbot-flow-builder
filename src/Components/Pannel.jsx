// Import the panel configuration
import { panelConfig } from '../config'

// Define the Panel component
const Panel = () => {
  // Define a function to handle the start of a drag event
  const onDragStart = (event, nodeType) => {
    // Set the dataTransfer data to the node type
    event.dataTransfer.setData('application/reactflow', nodeType)
    // Allow the drag event to move the dragged element
    event.dataTransfer.effectAllowed = 'move'
  }

  // Render the panel
  return (
    <div className="flex flex-wrap justify-between gap-6 p-4">
      {/* Map over the panel configuration to render each panel */}
      {panelConfig.map((panel) => (
        <div
          key={panel.text}
          className="flex items-center justify-center w-40 h-20 text-blue-500 border-2 border-blue-500 rounded-md cursor-grab"
          onDragStart={(event) => onDragStart(event, panel.node)}
          draggable
        >
          {/* Render the text of the panel */}
          {panel.text}
        </div>
      ))}
    </div>
  )
}

// Export the Panel component
export default Panel

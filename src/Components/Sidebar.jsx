// Import necessary dependencies
import { useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import Panel from './Pannel'
import Editor from './Editor'
import PropTypes from 'prop-types'

// Define the Sidebar component
const Sidebar = ({
  value,
  setValue,
  handleGoBack,
  selectedNodes,
}) => {
  // Use the useReactFlow hook to get access to the reactFlow instance
  const reactFlow = useReactFlow()

  // Use an effect to update the value when a node is selected
  useEffect(() => {
    // If there are any selected nodes
    if (selectedNodes.length > 0) {
      // Get the data from the first selected node and set it as the value
      setValue(reactFlow.getNode(selectedNodes[0]).data.message)
    }
  }, [reactFlow, selectedNodes]) // Depend on the reactFlow instance and the selectedNodes

  // Get the first selected node
  const isSelectedNode = selectedNodes[0]

  // Render the sidebar
  return (
    <div className="border-2 w-96">
      {/* If there is a selected node, render the Editor with the node's type and data */}
      {isSelectedNode && (
        <Editor
          type={reactFlow.getNode(isSelectedNode).type}
          value={value}
          setValue={setValue}
          handleGoBack={handleGoBack}
        />
      )}
      {/* If there is no selected node, render the Panel */}
      {!isSelectedNode && <Panel />}
    </div>
  )
}

// Define the prop types for the Sidebar component
Sidebar.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleGoBack: PropTypes.func.isRequired,
  selectedNodes: PropTypes.array.isRequired,
}

// Export the Sidebar component
export default Sidebar

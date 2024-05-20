// Import necessary dependencies
import { useState } from 'react'
import { useReactFlow } from 'reactflow'
import PropTypes from 'prop-types'

// Define the Header component
const Header = ({ handleGoBack }) => {
  // Use the useReactFlow hook to get access to the reactFlow instance
  const reactFlow = useReactFlow()
  // Define a state variable for error messages
  const [error, setError] = useState('')

  // Define a function to check if all nodes are connected
  const checkNodeConnections = (edges, nodes) => {
    // Create a set to store the ids of nodes that are connected
    const connectingEdges = new Set()

    // Add the source and target of each edge to the set
    edges.forEach((edge) => {
      connectingEdges.add(edge.source)
      connectingEdges.add(edge.target)
    })

    // Check if each node is in the set of connected nodes
    for (let i = 0; i < nodes.length; i++) {
      if (!connectingEdges.has(nodes[i].id)) {
        // If a node is not connected, set the error message and return
        setError('Cannot save flow')
        return
      }
    }

    // If all nodes are connected, return true
    return true
  }

  // Define a function to handle saving
  const handleSave = () => {
    // Get the current edges and nodes from the reactFlow instance
    const edges = reactFlow.getEdges()
    const nodes = reactFlow.getNodes()
    // Clear any existing error message
    setError('')
    // Check if all nodes are connected
    if (!checkNodeConnections(edges, nodes)) {
      // If not all nodes are connected, set the error message and return
      setError('Cannot save flow')
      return
    }
    // If all nodes are connected, go back to pannel
    handleGoBack()
  }

  // Render the header with a save button and an error message if there is one
  return (
    <header className="flex h-20 bg-gray-100">
      <div className="flex items-end justify-center h-full grow">
        {error ? (
          <div className="flex items-center justify-center w-48 py-3 text-lg font-semibold bg-red-200 h-14 rounded-xl">
            {error}
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center h-full w-96">
        <button
          onClick={handleSave}
          className="px-16 py-2 font-medium text-blue-500 border-2 border-blue-500 rounded-md"
        >
          Save
        </button>
      </div>
    </header>
  )
}

// Define the prop types for the Header component
Header.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
}

// Export the Header component
export default Header

// Import necessary dependencies
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useOnSelectionChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { nanoid } from 'nanoid'
import MessageNode from './MessageNote'
import Header from './Header'
import Sidebar from './Sidebar'

// Define custom node types
const nodeTypes = {
  messageNode: MessageNode,
}

// Define initial nodes
const initialNodes = [
  // Node 1
  {
    id: '1',
    type: 'messageNode',
    dragHandle: '.message-drag-handle',
    data: { message: 'test message 1' },
    position: { x: 200, y: 200 },
  },
  // Node 2
  {
    id: '2',
    type: 'messageNode',
    dragHandle: '.message-drag-handle',
    data: { message: 'test message 2' },
    position: { x: 800, y: 0 },
  },
]

// Function to get data for new node
const getDataForNewNode = (type) => {
  switch (type) {
    case 'messageNode':
      return { message: `new test message` }
    default:
      break
  }
}

// Main Flow component
const Flow = () => {
  // Define states and refs
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] =
    useState(null)
  // Define state for selected nodes and their values
  const [value, setValue] = useState('')
  const [selectedNodes, setSelectedNodes] = useState([])

  // Callback for when a connection is made
  const onConnect = useCallback(
    (connection) => {
      const isDuplicateEdge = edges.some(
        (edge) => edge.source === connection.source,
      )

      if (!isDuplicateEdge) {
        setEdges((eds) => addEdge(connection, eds))
      }
    },
    [edges, setEdges],
  )

  // Callback for when an item is dragged over the flow
  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Callback for when an item is dropped onto the flow
  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const type = event.dataTransfer.getData(
        'application/reactflow',
      )

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode = {
        id: nanoid(),
        type,
        position,
        data: getDataForNewNode(type),
      }

      setNodes((nds) => [...nds, newNode])
    },
    [reactFlowInstance],
  )

  // Hook to handle selection change
  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodes(nodes.map((node) => node.id))
    },
    dependencies: [setSelectedNodes], // Improvement: Specify dependency on setSelectedNodes
  })

  // Function to handle going back
  const handleGoBack = () => {
    setSelectedNodes([])
  }

  // Use an effect to update the data of the selected node when the selectedNodes, setNodes, or value changes
  useEffect(() => {
    // Call setNodes with a function that takes the previous nodes
    setNodes((prev) =>
      // Map over the previous nodes
      prev.map((node) =>
        // If the id of the node is the same as the id of the first selected node
        node.id === selectedNodes[0]
          ? // Return a new node object with the same properties as the old node, but with the message in the data updated to the new value
            { ...node, data: { ...node.data, message: value } }
          : // If the id of the node is not the same as the id of the first selected node, return the node unchanged
            node,
      ),
    )
    // Depend on the selectedNodes, setNodes, and value
  }, [selectedNodes, setNodes, value])
  // Render the flow and its components
  return (
    <div className="flex flex-col h-full">
      <Header handleGoBack={handleGoBack} />
      <div className="dndflow">
        <div
          className="h-full reactflow-wrapper"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          />
        </div>
        <Sidebar
          value={value}
          setValue={setValue}
          handleGoBack={handleGoBack}
          selectedNodes={selectedNodes}
        />
      </div>
    </div>
  )
}

// Export the Flow component
export default Flow

import { ReactFlowProvider } from 'reactflow'
import Flow from './Components/Flow'

function App() {
  return (
    <div className="h-full">
      {/* // The ReactFlowProvider component is a context provider from the react-flow-renderer library */}
      <ReactFlowProvider>
        {/* // The Flow component is responsible for rendering the flow diagram */}
        <Flow />
      </ReactFlowProvider>
    </div>
  )
}

export default App

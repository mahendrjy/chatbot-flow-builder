# chatbot-flow-builder

A chatbot flow is built by connecting multiple messages together to decide the order of execution. 

Hosting link - https://chatbot-flow-builder-sigma.vercel.app

![image](https://github.com/mahendrjy/chatbot-flow-builder/assets/31067376/39ad9b8c-d8ae-41a6-a20b-80aac4f8c890)


# Features:

1. **Text Node** 
    1. Our flow builder currently supports only one type of message (i.e Text Message).
    2. There can be multiple Text Nodes in one flow.
    3. Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel.
2. **Nodes Panel** 
    1. This panel houses all kind of Nodes that our Flow Builder supports.
    2. Right now there is only Message Node, but we’d be adding more types of Nodes in the future so make this section extensible 
3. **Edge**
    1. Connects two Nodes together
4. **Source Handle**
    1. Source of a connecting edge 
    2. Can only have **one edge** originating from a source handle
5. **Target Handle** 
    1. Target of a connecting edge
    2. Can have **more than one edge** connecting to a target handle 
6. **Settings Panel**
    
    ![image](https://github.com/mahendrjy/chatbot-flow-builder/assets/31067376/c9fa105c-e01b-45fd-9faf-4c83262efb79)

    
    1. Settings Panel will replace the Nodes Panel when a Node is selected
    2. It has a text field to edit text of the selected Text Node
7. **Save Button**
    1. Button to save the flow 
    2. **Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles** 
        
       ![image](https://github.com/mahendrjy/chatbot-flow-builder/assets/31067376/033bfae2-23bc-48a3-a454-5438a8258949)

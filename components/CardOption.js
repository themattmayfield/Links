
export default function CardOption(props) {
  
    return (
      <div 
      
      className="border border-dashed border-white h-32 rounded-xl flex flex-col space-y-3 items-center justify-center text-gray-200 cursor-pointer w-full px-8">
        <div className="flex items-center justify-between gap-x-4 w-full">
        <button 
        onClick={() => props.click(2)}
        className="bg-gray-600 w-1/2 py-2 rounded focus:outline-none "
        >Full</button>
        <button 
        onClick={() => props.click(1)}
        className="bg-gray-600 w-1/2 py-2 rounded focus:outline-none "
        >Half</button>
        </div>
        <button 
        onClick={props.addingHandler}
        className="bg-gray-600 w-full py-2 rounded focus:outline-none "
        >Cancel</button>
        
      </div>
    )
  }

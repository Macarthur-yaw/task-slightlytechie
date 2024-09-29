import { FaTimes } from "react-icons/fa";
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
     <>
     <div className="bg-white absolute rounded-lg shadow-lg w-full max-w-lg p-10 z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <button onClick={onClose} className="absolute p-2 top-0  right-0 text-gray-500 hover:text-black">
            <FaTimes size={20} /> {/* Close icon */}
          </button>
          {children}
        </div>
        
      <div
      onClick={()=>onClose()}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-10">
    </div>
    </>
    );
  };
export default Modal;  
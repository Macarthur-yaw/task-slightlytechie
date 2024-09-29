import { FaBars } from 'react-icons/fa'; // Icons from react-icons
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Navbar({ openModal, filterPosts }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate(); 
const handlePost=()=>{
    openModal()
    setShow(false)
}
  return (
    <div className="md:px-20">
      <div className="flex flex-row items-center justify-between text-gray-600 px-4 py-4">
        {show && (
          <div onClick={() => setShow(false)} className="bg-black w-full fixed z-10 h-screen bg-opacity-20 left-0 top-0"></div>
        )}
        <span className="flex flex-rows items-center w-full md:w-0 justify-between">
          <h1 className="font-bold p-4 text-[25px]">TECHHUB</h1>
          <div
            className={`${
              show
                ? 'border-[1px] p-2 text-[20px] z-20 fixed right-0 flex flex-col gap-10 justify-evenly min-w-[300px] h-screen top-0 bg-white md:hidden shadow-2xl items-start px-10'
                : 'hidden md:inline-flex pl-10 flex-row gap-6 font-semibold'
            }`}
          >
            {show && (
              <div>
                <h1 className="font-bold">TECHHUB</h1>
              </div>
            )}
            <ul className={`${show ? 'inline-flex flex-col gap-12' : 'flex flex-row gap-4'}`}>
              <li 
                onClick={() => {
               
                  navigate('/'); 
                }} 
                className="cursor-pointer"
              >
                Home
              </li>
              <li onClick={() => {
                filterPosts('Business');
               
              }} className="cursor-pointer">
                Business
              </li>
              <li onClick={() => {
                filterPosts('Entertainment');
            }} className="cursor-pointer">
                Entertainment
              </li>
              <li onClick={() => {
                filterPosts('Technology');
              }} className="cursor-pointer">
                Technology
              </li>
              <li onClick={() => {
                filterPosts('Sports');
             }} className="cursor-pointer">
                Sports
              </li>
              <button
          onClick={handlePost}
          className="flex flex-row md:hidden bg-[#FF4500] border-[#FF4500] text-[14px] text-white items-center gap-2 border-[1px] px-4 py-2 shadow-lg font-semibold hover:shadow-2xl rounded-[1px]"
        >
          Add Post
        </button>        
                 
       
            </ul>
    
          </div>

          <span onClick={() => setShow(!show)} className="md:hidden cursor-pointer text-[22px]">
            <FaBars />
          </span>

        </span>
        <span className="cursor-pointer p-[4px] rounded-md"></span>
        <button
          onClick={() => openModal()}
          className="md:flex flex-row hidden bg-[#FF4500] border-[#FF4500] text-[14px] text-white items-center gap-2 border-[1px] px-4 py-2 shadow-lg font-semibold hover:shadow-2xl rounded-[1px]"
        >
          Add Post
        </button>
      </div>
    </div>
  );
}

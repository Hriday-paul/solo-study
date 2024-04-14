
import { Link } from "react-router-dom";

import logo from '../../../public/logo.png';

import { PiShootingStarThin } from "react-icons/pi";

const Home = () => {
    return (
        <div className=" bg-[url('https://img.freepik.com/free-vector/background-abstract-line-digital-gradient-luxury_483537-2367.jpg')] bg-no-repeat bg-cover">
            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex justify-between items-center py-2">
                    <img className="h-10 md:h-14 lg:h-16 w-10 md:w-14 lg:w-16" src={logo} alt="logo" />
                    <Link to="/login" className="bg-transparent hover:bg-[#34AAFC] text-[#34AAFC] font-medium hover:text-white py-2 px-3 lg:px-5 text-sm lg:text-base border border-[#34AAFC] hover:border-transparent rounded-full font-popins">Login Now</Link>
                </nav>
                <div className="flex justify-center items-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-80px)]">
                    <div className="text-center mx-auto w-full md:w-3/5">
                        <h2 className="text-3xl lg:text-5xl font-bold text-gray-100 mb-2">
                            Empower your learning journey with <span className="text-transparent bg-gradient-to-r from-sky-400 to-blue-700 bg-clip-text text-5xl lg:text-6xl font-bold">Study Tracker</span>
                        </h2>
                        <p className="text-base md:text-lg lg:text-xl text-gray-300 my-2 text-center w-3/5 mx-auto mb-5">It ultimate tool to organize your study routines and boost your academic performance.</p>

                        <Link to='/study-room' className="inline-flex items-center px-4 py-2 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-sky-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-sky-700 hover:border-sky-700 hover:text-white focus-within:bg-sky-700 focus-within:border-sky-700">
                            Get Started
                            <PiShootingStarThin className="text-white text-xl ml-2"></PiShootingStarThin>
                        </Link>


                    </div>


                </div>
            </div>
        </div>
    );
};

export default Home;
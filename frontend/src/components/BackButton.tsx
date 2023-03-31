// import { BiArrowBack } from 'react-icons/bi'
import { TbCircleChevronLeft } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const BackButton = () => {
  return (
    <Link to="../" className='p-2'>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        <div className="flex items-center">
          <div className="mr-2">
            <TbCircleChevronLeft size={32} className="ml-auto" />
          </div>
          Back
        </div>
      </button>
    </Link>
  )
}

export default BackButton
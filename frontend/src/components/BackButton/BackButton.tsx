import { TbCircleChevronLeft } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='p-2' onClick={() => navigate(-1)}>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
        <div className="flex items-center">
          <TbCircleChevronLeft size={32} className="mr-2" />
          Back
        </div>
      </button>
    </div>
  )
}

export default BackButton

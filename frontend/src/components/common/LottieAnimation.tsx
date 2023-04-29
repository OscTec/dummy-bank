import Lottie from "lottie-react"

interface Props {
  animationData: any;
  text: string;
}

const LottieAnimation: React.FC<Props> = ({ animationData, text }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-32 h-32">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
      <div className="flex justify-center text-xl font-bold mt-4">
        {text}
      </div>
    </>
  )
}

export default LottieAnimation

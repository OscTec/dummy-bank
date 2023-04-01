import { TbCircleChevronRight } from "react-icons/tb"

const AccountSkeleton = () => {
  return (
    <div className="card h-32 w-96 bg-base-100 shadow-xl justify-center">
      <div className="flex">
        <figure className="pl-10">
          <div className="w-10 h-10 bg-base-300 rounded-full animate-pulse"></div>
        </figure>
        <div className="card-body text-left">
          <h2 className="card-title">
            <div className="w-40 h-4 bg-base-300 rounded-full animate-pulse"></div>
          </h2>
          <p>
            <div className="w-16 h-4 bg-base-300 rounded-full animate-pulse"></div>
          </p>
        </div>
        <figure className="animate-pulse">
          <TbCircleChevronRight size={32} className="ml-auto mr-10" />
        </figure>
      </div>
    </div>
  )
}

export default AccountSkeleton

import Card from "../components/Card"
import Navbar from "../components/Navbar"

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#f2f2f2', height: '100vh' }} className="drop-shadow-2xl">
      <Navbar notifications={[]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center pt-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Dashboard
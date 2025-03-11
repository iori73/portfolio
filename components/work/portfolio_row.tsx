export default function PortfolioRow() {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          <div className="space-y-2">
            <h3 className="text-gray-500 font-normal text-sm md:text-base">Timeline</h3>
            <p className="font-medium text-base md:text-lg">Feb 14, 2024 - Feb 15, 2024</p>
          </div>
  
          <div className="space-y-2">
            <h3 className="text-gray-500 font-normal text-sm md:text-base">My Role</h3>
            <p className="font-medium text-base md:text-lg">UI, UX, Intern</p>
          </div>
  
          <div className="space-y-2">
            <h3 className="text-gray-500 font-normal text-sm md:text-base">Team</h3>
            <p className="font-medium text-base md:text-lg">Solo</p>
          </div>
  
          <div className="space-y-2">
            <h3 className="text-gray-500 font-normal text-sm md:text-base">Deliverables</h3>
            <p className="font-medium text-base md:text-lg">Wireframes</p>
          </div>
        </div>
      </div>
    )
  }
  
  
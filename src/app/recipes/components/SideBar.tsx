export default function Sidebar({ items }:any) {
    return (
      <div className="md:w-1/4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Added Items</h2>
          <ul className="space-y-2">
            {items.map((item:any, index:any) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
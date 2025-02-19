import { UserGroupIcon, BriefcaseIcon, ChartBarIcon } from '@heroicons/react/24/outline'

function Dashboard({ employees }) {
  const stats = [
    { name: 'Total Employees', value: employees.length, icon: UserGroupIcon },
    { name: 'Departments', value: [...new Set(employees.map(emp => emp.department))].length, icon: BriefcaseIcon },
    { name: 'Active Employees', value: employees.filter(emp => emp.status === 'Active').length, icon: ChartBarIcon },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-semibold text-indigo-600">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
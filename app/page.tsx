// app/page.tsx
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Find Your Perfect
          <span className="block text-blue-600 dark:text-blue-400">Fantasy Name</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Discover thousands of unique names for characters, creatures, and worlds. 
          From elves to dragons, we've got every fantasy name you need.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/names/elf-names" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse Names
          </a>
          <a 
            href="/generate" 
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            AI Generate
          </a>
        </div>
      </div>

      {/* Quick Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { name: 'Elves', icon: '🧝', href: '/names/elf-names' },
          { name: 'Dragons', icon: '🐉', href: '/names/dragon-names' },
          { name: 'Wizards', icon: '🧙', href: '/names/wizard-names' },
          { name: 'Kingdoms', icon: '🏰', href: '/names/kingdom-names' },
        ].map((category) => (
          <a
            key={category.name}
            href={category.href}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow text-center"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <div className="font-semibold text-gray-900 dark:text-white">{category.name}</div>
          </a>
        ))}
      </div>

      {/* Stats */}
      <div className="text-center">
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">10k+</div>
            <div className="text-gray-600 dark:text-gray-400">Names</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">AI</div>
            <div className="text-gray-600 dark:text-gray-400">Generator</div>
          </div>
        </div>
      </div>
    </div>
  );
}
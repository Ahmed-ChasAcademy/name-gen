// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Fantasy Name Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Find the perfect names for your characters, creatures, and worlds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/names/elf-names" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Names
            </a>
            <a 
              href="/generate" 
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              AI Generate
            </a>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Popular Categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Elves', href: '/names/elf-names' },
              { name: 'Dragons', href: '/names/dragon-names' },
              { name: 'Wizards', href: '/names/wizard-names' },
              { name: 'Kingdoms', href: '/names/kingdom-names' },
              { name: 'Vampires', href: '/names/vampire-names' },
              { name: 'Robots', href: '/names/robot-names' },
              { name: 'Gods', href: '/names/god-names' },
              { name: 'Superheroes', href: '/names/superhero-names' },
            ].map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-center"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {category.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Names' },
              { number: '50+', label: 'Categories' },
              { number: 'Instant', label: 'AI Generation' },
              { number: 'Free', label: 'Forever' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Made with ♥
          </div>
          
          <div className="flex space-x-4">
            <a href="/support" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Support
            </a>
            <a href="/donate" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Donate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
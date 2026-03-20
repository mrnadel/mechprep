export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-4xl">&#x2699;&#xFE0F;</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">MechPrep</h1>
          <p className="text-sm text-gray-500 mt-1">
            Master mechanical engineering interviews
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

import Navbar from "@/components/Navbar";

export default function Home() {
    return (
      <>
      <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
          <main className="text-center">
            <h1 className="text-5xl font-bold text-gray-800">
              Welcome to Next.js!
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Get started by editing <code className="bg-gray-200 p-1 rounded">pages/index.jsx</code>
            </p>
          </main>
        </div>
      </>
    );
  }
  
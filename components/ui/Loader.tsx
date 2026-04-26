export default function Loader() {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-green-500" />
        <p className="text-sm text-gray-400">Loading your farm...</p>
      </div>
    );
  }
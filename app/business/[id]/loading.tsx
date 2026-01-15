export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <span className="loader"></span>
      <p className="mt-4 text-sm text-muted-foreground animate-pulse">Loading organization...</p>
    </div>
  )
}

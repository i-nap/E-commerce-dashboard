export default function Loading() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
            <div className="h-4 w-32 bg-gray-200 rounded mb-6" />

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
                
                <div className="w-full md:w-1/2 aspect-square bg-gray-100 rounded-2xl md:rounded-3xl shrink-0" />

                <div className="flex flex-col gap-6 flex-1 w-full pt-2 lg:pt-8">
                    
                    <div className="flex flex-col gap-3">
                        <div className="h-6 w-24 bg-gray-200 rounded-full" />
                        
                        <div className="h-10 w-full bg-gray-200 rounded-md" />
                        <div className="h-10 w-2/3 bg-gray-200 rounded-md" />

                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-5 w-5 bg-gray-200 rounded-full" />
                            <div className="h-5 w-32 bg-gray-200 rounded" />
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-full bg-gray-100 rounded" />
                        <div className="h-4 w-3/4 bg-gray-100 rounded" />
                    </div>

                    <div className="mt-2 bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                        <div className="space-y-2">
                            <div className="h-3 w-12 bg-gray-200 rounded" />
                            <div className="h-10 w-32 bg-gray-200 rounded" />
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-28 bg-gray-200 rounded-lg" />
                            <div className="h-12 flex-1 bg-gray-200 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
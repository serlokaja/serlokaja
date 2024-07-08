export default function Skeleton() {
    return (
        <>
            <div className="flex flex-col gap-4 w-1/4 px-1 mb-5 mt-5">
                <div className=" h-72 w-full bg-slate-200 rounded-lg"></div>
                <div className=" h-4 w-full bg-slate-200"></div>
                <div className=" h-4 w-64 bg-slate-200"></div>
                <div className=" h-4 w-28 bg-slate-200"></div>
            </div>
        </>
    )
}
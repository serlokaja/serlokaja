export default function SkeletonPemilik() {
    return (
      <div className="card card-side bg-slate-100 shadow-xl w-full mt-5">
        <div className="w-48 h-48 bg-slate-200 rounded-lg"></div>
        <div className="card-body p-4">
          <div className="h-4 bg-slate-200 w-full mb-2"></div>
          <div className="h-4 bg-slate-200 w-64 mb-2"></div>
          <div className="h-4 bg-slate-200 w-28"></div>
        </div>
      </div>
    );
  }
  
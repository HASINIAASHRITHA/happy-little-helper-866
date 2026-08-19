import { motion } from 'framer-motion';

export const ProjectSkeleton = () => {
  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden h-full flex flex-col">
      <div className="mb-4 h-48 bg-secondary rounded-lg overflow-hidden relative border border-white/5 animate-pulse">
        <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 flex items-center px-3 gap-1 z-10">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="h-7 w-2/3 bg-white/5 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-white/5 rounded-md animate-pulse" />
          <div className="h-4 w-full bg-white/5 rounded-md animate-pulse" />
          <div className="h-4 w-5/6 bg-white/5 rounded-md animate-pulse" />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 bg-white/5 rounded animate-pulse" />
          <div className="h-6 w-16 bg-white/5 rounded animate-pulse" />
          <div className="h-6 w-16 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const FeaturedProjectSkeleton = ({ index }: { index: number }) => {
  return (
    <div className="grid lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
      <div className={`lg:col-span-7 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass border border-white/5 bg-secondary/20">
          <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 flex items-center px-4 gap-2 z-10 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>
      <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}>
        <div className="h-4 w-24 bg-white/5 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
        <div className="h-16 w-3/4 bg-white/5 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-full bg-white/5 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
          <div className="h-6 w-full bg-white/5 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-white/5 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
          <div className="h-12 w-12 bg-white/5 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};

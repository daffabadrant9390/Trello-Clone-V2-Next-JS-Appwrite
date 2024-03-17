import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonBoardLoading = () => {
  return (
    <SkeletonTheme baseColor="#615f5f" highlightColor="#8d8b8b">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-container padding-container">
        {[...new Array(3)].map((_, idx) => (
          <div
            className="w-full bg-gray-100 p-2 rounded-2xl flex flex-col items-start gap-2 md:gap-3"
            key={idx}
          >
            <div className="w-full flex flex-row items-center justify-between gap-2 md:gap-3">
              <Skeleton
                containerClassName="flex-1 w-full"
                className="w-full h-[28px]"
              />
              <Skeleton containerClassName="w-[28px]" className="h-[28px]" />
            </div>

            <div className="w-full flex flex-col items-start gap-2 md:gap-3">
              {[...new Array(3)].map((_, idx) => (
                <Skeleton
                  key={`skeleton-item-${idx}`}
                  containerClassName="flex-1 w-full"
                  className="h-[88px] rounded-md"
                />
              ))}
            </div>

            <div className="w-full flex flex-row justify-end">
              <Skeleton circle width={40} height={40} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonBoardLoading;

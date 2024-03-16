import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';
import BeatLoader from 'react-spinners/BeatLoader';
import PacmanLoader from 'react-spinners/PacmanLoader';

type LoadingIndicatorProps = {
  isLoading: boolean;
  loadingDescription?: string;
  loadingType: 'clip-loader' | 'pacman-loader' | 'beat-loader';
};

const LoadingIndicator = ({
  isLoading,
  loadingDescription,
  loadingType,
}: LoadingIndicatorProps) => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-row items-center justify-center z-[999] bg-black/60">
      <div className="bg-gray-100 rounded-md flex flex-col items-center justify-center p-4 gap-10 min-w-[340px] min-h-[200px]">
        {loadingType === 'beat-loader' ? (
          <BeatLoader
            color={'#407BFF'}
            loading={isLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : loadingType === 'clip-loader' ? (
          <ClipLoader
            color={'#407BFF'}
            loading={isLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <PacmanLoader
            color={'#407BFF'}
            loading={isLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        <span className="inline-block text-gray-800 font-semibold text-lg">
          {!!loadingDescription
            ? loadingDescription
            : 'Processing, please wait...'}
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;

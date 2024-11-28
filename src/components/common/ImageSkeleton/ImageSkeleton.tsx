import { type FC, type HTMLProps } from 'react';

interface ImageSkeleton extends HTMLProps<HTMLDivElement> {
  className?: string;
}

const ImageSkeleton: FC<ImageSkeleton> = (props) => (
  <div className="w-full h-0 relative overflow-hidden rounded-sm pb-[100%]" {...props}>
    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse" />
  </div>
);

export default ImageSkeleton;

import { Skeleton } from 'antd';

const VideoLoading = () => {
    return (
        <div className="grid grid-cols-4 gap-3 my-2">
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
            <div className='border border-[#3b3538] rounded-lg'>
                <Skeleton.Button active={true} size={50} shape={'default'} block={false} />
            </div>
        </div>
    );
};

export default VideoLoading;
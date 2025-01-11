import { ArrowUpRight } from 'react-feather';
import HeartIllo from './HeartIllo';

function AppHeader() {

    return (
        <div className="flex justify-between items-center border-t border-slate-300 pb-6 pt-4 w-full max-w-[450px] font-geist text-lg">
            <div className="flex items-center px-1 gap-2">
            <HeartIllo />
                <a
                    href="https://www.tonyzeb.design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <div  className='flex flex-row items-center'>
                        <h2 className='font-geist text-sm font-medium text-slate-900  hover:underline'>Tony Sebastian</h2>
                        <ArrowUpRight size={16} className="text-slate-900 ml-1" />
                    </div>
                </a>
            </div>
            <a
                href="https://github.com/tonyzebastian/figma-activity-feed.git"
                target="_blank"
                rel="noopener noreferrer"
                >
                 <div  className='flex flex-row items-center'>
                    <h2 className='font-geist text-sm font-medium text-slate-900  hover:underline'>Github</h2>
                    <ArrowUpRight size={16} className="text-slate-900 ml-1" />
                </div>
            </a>
        </div>
            
    );
}

export default AppHeader;
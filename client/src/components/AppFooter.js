import { ArrowUpRight } from 'react-feather';

function AppHeader() {

    return (
        <div className="flex justify-between items-center border-t border-slate-300 pb-6 pt-4 w-full max-w-[450px] font-geist text-lg">
            <div className="flex items-center px-1 gap-2">
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6539 2.1815C3.15338 0.678757 5.58451 0.678757 7.08399 2.1815L7.79124 2.8903L8.4985 2.1815C9.99797 0.678757 12.4291 0.678757 13.9286 2.1815C15.4281 3.68424 15.4281 6.12067 13.9286 7.62342L7.79124 13.7741L1.6539 7.62342C0.154428 6.12067 0.154428 3.68424 1.6539 2.1815Z" fill="#F24E1E"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.27943 1.80723C2.98597 0.0969712 5.7533 0.0969712 7.45984 1.80723L7.79193 2.14004L8.12402 1.80723C9.83056 0.0969712 12.5979 0.0969711 14.3044 1.80723C16.0103 3.51685 16.0103 6.28822 14.3044 7.99784L7.79193 14.5245L1.27943 7.99784C-0.426476 6.28822 -0.426476 3.51685 1.27943 1.80723ZM6.70951 2.55593C5.4171 1.2607 3.32217 1.2607 2.02976 2.55593C0.736712 3.85179 0.736712 5.95328 2.02976 7.24915L7.79193 13.0239L13.5541 7.24915C14.8472 5.95328 14.8472 3.85179 13.5541 2.55593C12.2617 1.2607 10.1668 1.2607 8.87435 2.55593L7.79193 3.64071L6.70951 2.55593Z" fill="#0F172A"/>
                </svg>
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
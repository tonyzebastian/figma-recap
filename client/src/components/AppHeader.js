import { GitHub } from 'react-feather';

function AppHeader() {

    return (
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 py-3 px-4 max-w-[1600px] font-geist text-lg">
            <h1>Figma Recap</h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center px-2 gap-1">
                    <h1 className='font-geist text-sm text-slate-700 dark:text-slate-400'>made by</h1>
                    <a
                    href="https://www.tonyzeb.design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        <h2 className='font-geist text-sm text-blue-900 dark:text-blue-500 hover:underline'>tony sebastian</h2>
                    </a>
                </div>
                <a
                    href="https://github.com/tonyzebastian/uiglow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <GitHub size={16} className="text-slate-600 dark:text-slate-300" />
                </a>
            </div>
        </div>
    );
}

export default AppHeader;
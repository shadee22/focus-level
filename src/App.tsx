import React from 'react';
import ProductivityBarChart from './components/BarChat/ProductivyBarChart' ;


const App: React.FC = () => {
    return (
        <div className='hello-world text'>
            <div className='absolute min-h-screen max-w-screen w-screen
             bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#000] to-[#595151]'>
                <div className={`absolute inset-0 bg-[url(/public/noise.svg)] opacity-25 brightness-100 contrast-150`}/>
            </div>
            <div className="max-w-screen-md container relative mx-auto h-screen  p-12">
                <h1 className="text-3xl p-4 font-bold text-white">
                    Focus Level
                </h1>

                <div className='max-w-40 max-h-40 '>
                    <ProductivityBarChart/>
                </div>



            </div>
        </div>
    );
}

export default App;

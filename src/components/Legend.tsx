import {reverseLabelsMapping} from "./Utils";
import {stringify} from "querystring";

const Legend = () => {
    return (
        <div className="border-gray-500 bg-gray-600/10 border-2  w-56 rounded-3xl mt-4">
            <p className={`text-white font-bold text-center mt-2`}>Focus Level</p>
            <ul className="space-y-3 p-3 ">
                {
                    [1, 2, 3, 4].map((value: number, index:number) => {
                        return (
                            <li className="flex items-center space-x-3 text-gray-400">
                                <div
                                    className="bg-white text-black rounded-xl text-xs text-center h-7 w-7 flex
                                     items-center justify-center font-bold">
                                    {index}
                                </div>
                                <div className="text-sm">
                                    {reverseLabelsMapping[index]}
                                </div>
                            </li>
                        )
                    })
                }


            </ul>
        </div>
    )
}
export default  Legend;
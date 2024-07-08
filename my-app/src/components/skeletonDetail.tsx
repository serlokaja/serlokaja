import { GiRoundStar } from "react-icons/gi";
export default function SkeletonDetail() {
  return (
    <div className="bg-white py-8 animate-pulse">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row -mx-4">
          <div className="flex px-4">
            <div className="flex mx-2">
                <div
                  className="w-15 h-20 rounded-md bg-gray-300 my-2"
                ></div>
            </div>
            <div className="h-[480px] w-[500px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4"></div>
          </div>
          <div className="px-4 flex flex-col justify-between relative text-black w-full mr-48">
            <div>
              <h2 className="text-2xl font-bold bg-gray-300 rounded-md h-8 mb-2"></h2>
              <div className="flex mb-2">
                <div className="mr-4">
                  <div className="flex items-center mt-2 space-x-2">
                    <div className="w-full h-8 bg-gray-300 rounded-lg"></div>
                    <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
                    <GiRoundStar className="m-2 w-4 h-4 text-blue-600" />
                    <div className="w-10 h-8 bg-gray-300 rounded-lg"></div>
                    <div className="w-1/2 h-8 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="w-full h-6 bg-gray-300 rounded-lg mt-2"></div>
              </div>

              <div className="mb-2">
                <div className="w-full h-6 bg-gray-300 rounded-lg mt-2"></div>
              </div>

              <div>
                <div className="w-full h-24 bg-gray-300 rounded-lg mt-2"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="flex -mx-2 mb-2">
                    <div className="w-full px-2">
                      <div className="w-1/3 h-8 bg-gray-300 rounded-lg mb-2"></div>
                      <div className="flex space-x-2">
                        <div className="flex-1 h-10 bg-blue-600 rounded-lg"></div>
                        <div className="flex-1 h-10 bg-green-600 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

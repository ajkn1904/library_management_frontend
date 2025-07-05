import { useGetBooksByIdQuery } from "@/redux/api/baseApi";
import { BookOpenText } from "lucide-react";
import { useParams } from "react-router";
import { SkeletonCard } from "../modules/SkeletonCard";

const BookDetails = () => {
    const bookId = useParams().id as string;
    const { data, isLoading } = useGetBooksByIdQuery(bookId);
    //console.log(data);
    if (isLoading) {
        return <SkeletonCard />;
    }

    return (
        <div className="min-h-fit bg-blue-100 ">
            <h1 className='font-serif text-2xl md:text-3xl lg:text-4xl pt-3 ml-[15px]'>Details of ❝<span className="font-bold">{data.data.title}</span>❞</h1>

            <div className="flex items-center justify-center px-4 py-12">
                <div className="max-w-4xl w-full shadow-md rounded-xl p-8 flex flex-col-reverse md:flex-row gap-12 bg-[#fefaf6] items-center">

                    <div className="text-[#2c2c2c] space-y-6 md:w-1/2">
                        <BookOpenText className="text-yellow-500 " />
                        <div>
                            <h3 className="font-semibold text-lg">Author</h3>
                            <p className="mt-1 text-base">{data.data.author}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Genre</h3>
                            <p className="mt-1 text-base">{data.data.genre}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">ISBN</h3>
                            <p className="mt-1 text-base">{data.data.isbn}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Description</h3>
                            <p className="mt-1 text-base leading-relaxed">
                                {data.data?.description || "No description available."}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Total</h3>
                            <p className="mt-1 text-base">
                                <span className="font-semibold">{data.data.copies} </span> {`${data.data.copies < 2 ? "copy available." : "copies available."
                                    } `}
                            </p>
                        </div>
                    </div>


                    <div className="md:w-1/2 flex items-center justify-center">
                        <div className="w-60 h-80 bg-white rounded-[24px] border-[10px] border-[#f6d37f] flex flex-col items-center justify-center shadow-lg">
                            <div className="w-12 h-12 bg-yellow-400 rounded-full mb-4"></div>
                            {data.data?.title?.split(" ").map((word: string, idx: number) => (
                                <div key={idx} className="text-2xl font-bold text-purple-400 font-serif tracking-wide text-center leading-tight text-shadow-2xs text-shadow-amber-400 ">
                                    {word}
                                </div>
                            ))}
                            <div className="w-12 h-12 bg-yellow-400 rounded-full mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default BookDetails;
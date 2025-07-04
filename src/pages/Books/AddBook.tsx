import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import type { IBooksMutation } from "@/types/books.interface";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"

import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const AddBook = () => {

    const form = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [createBook, { isSuccess, isError, isLoading, data, error }] = useCreateBookMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("✅ Book created successfully!");
            form.reset();
            navigate("/books");
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (isError) {
            if (error && "data" in error) {
                const rawMessage = (error.data as { message?: string })?.message || "";

                if (rawMessage.includes("E11000 duplicate key error") && rawMessage.includes("isbn")) {
                    setErrorMessage("Duplicate ISBN. Try a new ISBN.");
                } else if (rawMessage.includes("Validation failed")) {
                    setErrorMessage("Copies must be a positive number. Try again.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    }, [isError, error]);


    console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const bookData = {
            ...data,
            description: data.description ? data.description : "",
            copies: parseInt(data.copies),
            available: data.copies <= 0 ? false : true,
        }
        await createBook(bookData as IBooksMutation);
    }




    return (
        <>
            <h1 className='font-bold font-serif text-5xl ml-[15px]'>Add Book</h1>

            {errorMessage && (
                <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-md w-[90%] lg:max-w-[700px] mx-auto mt-4">
                    {errorMessage}
                </div>
            )}

            <div className="shadow-2xl border rounded-lg p-5 w-[90%] lg:max-w-[700px] mx-auto my-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className="mb-1 mt-2">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type a Title" {...field} value={field.value || ""} required />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="author" render={({ field }) => (
                            <FormItem className="mb-1 mt-2">
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input placeholder="Author Name" {...field} value={field.value || ""} required />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="genre" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                    <FormControl className="w-full mb-1 mt-2">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Genre." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="FICTION">FICTION</SelectItem>
                                        <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                        <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                        <SelectItem value="HISTORY">HISTORY</SelectItem>
                                        <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                        <SelectItem value="FANTASY">FANTASY</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control} name="isbn" render={({ field }) => (
                            <FormItem className="mb-1 mt-2">
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type ISBN" {...field} value={field.value || ""} required />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem className="mb-1 mt-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value || ""} />
                                </FormControl>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="copies" render={({ field }) => (
                            <FormItem className="mb-1 mt-2">
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type a number of copies available" {...field} value={field.value || ""} required />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="available" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Available</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue="true">
                                    <FormControl className="w-full mb-1 mt-2">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select availability" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="true">Available</SelectItem>
                                        <SelectItem value="false">Unavailable</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                        />



                        <div className="flex justify-end items-center gap-2 mt-5">
                            <Button className="my-1.5" type="submit">Save changes</Button>
                        </div>
                    </form>
                </Form>


            </div>
        </>
    )
};

export default AddBook;
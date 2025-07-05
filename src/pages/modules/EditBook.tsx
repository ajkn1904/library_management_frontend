import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditBookMutation } from "@/redux/api/baseApi";
import type { IBooks } from "@/types/books.interface";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify";
import { SkeletonCard } from "./SkeletonCard";

interface IEditBookProps extends IBooks {
    setEditState: (state: boolean) => void;
}

const EditBook = ({ setEditState, ...book }: IEditBookProps) => {
    const form = useForm({
        defaultValues: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book?.description,
            copies: book.copies,
            available: book?.available,
        }
    });

    const [editBook, { isSuccess, isLoading, isError }] = useEditBookMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.info("Book edited successfully!");
            form.reset();
            setEditState(false);
        }
    }, [isSuccess]);


    //console.log(data);

    if (isLoading) {
        return <SkeletonCard />;
    }
    if (isError) {
        return toast.error(<div className="text-red-600">Unexpected error occurred. Please try again later.</div>);
    }


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const newBookData = {
            ...data,
            copies: parseInt(data.copies),
            available: data.copies <= 0 ? false : true,
        }
        //console.log(newBookData);
        await editBook({ id: book._id, newBookData });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="mb-1 mt-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} required />
                        </FormControl>
                    </FormItem>
                )} />
                <FormField control={form.control} name="author" render={({ field }) => (
                    <FormItem className="mb-1 mt-2">
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ""} required />
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
                            <Input type="number" {...field} value={field.value || ""} required />
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
                            <Input type="number" min={0} {...field} value={field.value > 0 ? field.value : 0} required />
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



                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="my-3.5" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button className="my-3.5" type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>


    )
};

export default EditBook;
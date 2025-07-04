import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateBorrowMutation } from "@/redux/api/baseApi";
import { format } from "date-fns";
import { CalendarIcon} from "lucide-react";
import { useEffect } from "react";
import { useForm, type FieldError, type FieldValues, type SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { IBorrowProps } from "@/types/borrow.interface";

const AddBorrow = ({ book }: IBorrowProps) => {

    const form = useForm({defaultValues: {book:"", quantity: 1, dueDate: new Date() }});
    const navigate = useNavigate();

    const [createBorrow, { isSuccess, isLoading, isError}] = useCreateBorrowMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("✅ Book borrowed successfully!");
            form.reset();
            navigate("/borrow-summary");
        }
    }, [isSuccess, navigate]);


   //console.log(data);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if( isError) {
        return <div className="text-red-600">Error borrowing book. Please try again later.</div>;
    }


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const borrowData = {
            ...data,
            book: book.bookId,
        }
        //console.log(borrowData);
        await createBorrow(borrowData);
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField control={form.control} name="book" render={({ field }) => (
                    <FormItem className="mb-1 mt-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input {...field} value={book.title} readOnly />
                        </FormControl>
                    </FormItem>
                )} />

                <FormField control={form.control} name="quantity"
                    rules={{ required: true, min: { value: 1, message: "Minimum 1 copy required" }, max: { value: book.copies, message: `Cannot exceed ${book.copies} copies` }, }} render={({ field }) => (
                        <FormItem className="mb-1 mt-2">
                            <FormLabel>Quantity</FormLabel>
                            <FormControl >
                                <Input type="number" {...field} min={0} max={book.copies} value={field.value ?? 1} required />
                            </FormControl>

                            {form.formState.errors.quantity && (
                                <p className="text-sm text-red-600 mt-2">
                                    {(form.formState.errors.quantity as FieldError)?.message || "Out of limit"}
                                </p>
                            )}
                        </FormItem>
                    )}
                />


                <FormField control={form.control} name="dueDate" render={({ field }) => (
                                <FormItem className="flex flex-col mb-3.5">
                                    <FormLabel>Deu Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (format(field.value, "PP")).toString() : (<span>Pick a date</span>)}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown" />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                            />


                <div className="flex justify-end items-center gap-2 mt-5">
                    <Button className="my-1.5" type="submit">Save changes</Button>
                </div>
            </form>
        </Form>

    );
};

export default AddBorrow;
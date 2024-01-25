"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUpload } from "../file-upload";
import qs from "query-string"

import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "../ui/form";


const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "file is required",
  }),
});

const MessageFileModal = () => {


  const {isOpen,onClose,type,data}=useModal()
  const {apiUrl,query}=data
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const isModalOpen=isOpen && type==="messageFile"

  const isLoading = form.formState.isSubmitting;

  const router=useRouter()
  
  const handleClose=()=>{
    form.reset()
    onClose()
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url=qs.stringifyUrl({
        url:apiUrl||"",
        query
      })
      await axios.post(url,{
        ...values,
        content:values.fileUrl
      })
      form.reset()
      router.refresh()
      handleClose()
    } catch (error:any) {
      console.log(error.message)

    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center text-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Send a file as a message.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 py-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload 
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button type="submit" disabled={isLoading} variant="primary">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;

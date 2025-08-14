import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertApplication } from "@shared/schema";

const applicationFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email"),
  agreedToTerms: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных"),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId?: string;
}

export default function ApplicationModal({ isOpen, onClose, courseId }: ApplicationModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      agreedToTerms: false,
    },
  });

  const createApplication = useMutation({
    mutationFn: async (data: InsertApplication) => {
      const response = await apiRequest("POST", "/api/applications", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      form.reset();
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить заявку",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    createApplication.mutate({
      name: data.name,
      phone: data.phone,
      email: data.email,
      agreedToTerms: data.agreedToTerms,
      courseId: courseId,
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            Оставьте заявку
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2">
            Оставляй заявку, и мы подберём маршрут под твои цели.
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Иван Иванов"
                      {...field}
                      className="px-4 py-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+7 900 800 70 60"
                      {...field}
                      className="px-4 py-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.ru"
                      {...field}
                      className="px-4 py-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreedToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label className="text-sm text-gray-600 text-left">
                      Я согласен на обработку персональных данных*
                    </label>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={createApplication.isPending}
              className="w-full bg-primary text-white py-3 hover:bg-blue-600 transition-colors"
            >
              {createApplication.isPending ? "Отправка..." : "Оставить заявку"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

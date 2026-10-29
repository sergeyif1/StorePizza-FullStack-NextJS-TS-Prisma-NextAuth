"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/shared/hooks";
import { CheckoutSidebar, Container, Title } from "@/shared/components";
import {
  CheckoutAdressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  PaymentWidget,
} from "@/shared/components/shared/checkout";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import toast from "react-hot-toast";
import { createOrder } from "@/app/api/actions";
import { WayForPayPaymentConfig } from "@/@types/WayForPay";
import {
  CheckoutPaymentDialog,
  CheckoutPaymentStatus,
} from "@/shared/components/shared/checkout/CheckoutPaymentDialog";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] =
    React.useState<CheckoutPaymentStatus>(null);

  const [paymentConfig, setPaymentConfig] =
    React.useState<WayForPayPaymentConfig | null>(null);

  const [submitting, setSubmitting] = React.useState(false);

  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: session?.user?.name || "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const result = await createOrder(data);

      if (!result || !result.paymentConfig) {
        toast.error("Payment init failed");
        return;
      }

      setPaymentConfig(result.paymentConfig);

      // toast.success("Замовлення успішно створено! 🍕🧩 Перехід до оплати", {
      //   icon: "✅",
      // });
    } catch (err) {
      console.error(err);

      toast.error("Не вдалося створити замовлення", {
        icon: "❌",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформлення замовлення"
        // size="xl"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAdressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>

      <CheckoutPaymentDialog
        open={paymentStatus !== null}
        status={paymentStatus}
        onClose={() => setPaymentStatus(null)}
      />

      <PaymentWidget
        paymentConfig={paymentConfig}
        onApproved={() => setPaymentStatus("approved")}
        onDeclined={() => setPaymentStatus("declined")}
        onPending={() => setPaymentStatus("pending")}
      />
    </Container>
  );
}

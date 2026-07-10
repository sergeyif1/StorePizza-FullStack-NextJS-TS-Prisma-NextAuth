"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";

export type CheckoutPaymentStatus = "approved" | "declined" | "pending" | null;

interface Props {
  status: CheckoutPaymentStatus;
  open: boolean;
  onClose: () => void;
}

export const CheckoutPaymentDialog: React.FC<Props> = ({
  status,
  open,
  onClose,
}) => {
  if (!status) {
    return null;
  }

  const content = {
    approved: {
      title: "✅ Оплату успішно виконано",
      description: (
        <>
          <p>Дякуємо за ваше замовлення!</p>

          <p className="mt-3">Ми вже почали його обробку.</p>

          <p className="mt-3">
            Копію замовлення відправлено на вашу електронну пошту.
          </p>
        </>
      ),
      button: "Добре",
    },

    declined: {
      title: "❌ Оплату не завершено",
      description: (
        <>
          <p>Ваше замовлення збережено.</p>

          <p className="mt-3">
            Ви можете повернутися до оплати пізніше в особистому кабінеті.
          </p>

          <p className="mt-3">
            Також лист із посиланням для оплати буде надіслано на вашу
            електронну адресу.
          </p>
        </>
      ),
      button: "Зрозуміло",
    },

    pending: {
      title: "⏳ Платіж обробляється",
      description: (
        <>
          <p>Це може зайняти кілька хвилин.</p>

          <p className="mt-3">Ми повідомимо вас після отримання результату.</p>
        </>
      ),
      button: "Добре",
    },
  }[status];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
        </DialogHeader>

        <div className="text-sm leading-7">{content.description}</div>

        <DialogFooter>
          <Button onClick={onClose}>{content.button}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

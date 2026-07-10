"use client";

import React from "react";
import type {
  WayForPayPaymentConfig,
  WayForPayPaymentResult,
} from "@/@types/WayForPay";

interface Props {
  paymentConfig: WayForPayPaymentConfig | null;

  onApproved: () => void;
  onDeclined: () => void;
  onPending: () => void;
}

export const PaymentWidget: React.FC<Props> = ({
  paymentConfig,
  onApproved,
  onDeclined,
  onPending,
}) => {
  const isOpened = React.useRef(false);

  React.useEffect(() => {
    if (!paymentConfig) {
      return;
    }

    // console.log("WayForPay config:", paymentConfig);

    const initWidget = () => {
      const Wayforpay = (window as any).Wayforpay;

      if (!Wayforpay) {
        console.error("WayForPay constructor not found");
        return;
      }

      const wayforpay = new Wayforpay();

      // console.log("WayForPay instance:", wayforpay);

      if (isOpened.current) {
        return;
      }

      isOpened.current = true;

      // console.log("SERVICE URL:", paymentConfig.serviceUrl);

      wayforpay.run(
        paymentConfig,

        (response: WayForPayPaymentResult) => {
          // console.log("APPROVED:", response);
          onApproved();
        },

        (response: WayForPayPaymentResult) => {
          // console.log("DECLINED:", response);
          onDeclined();
        },

        (response: WayForPayPaymentResult) => {
          // console.log("PENDING:", response);
          onPending();
        },
      );
    };

    const scriptId = "wayforpay-sdk";

    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      // console.log("WayForPay SDK already loaded");
      initWidget();
      return;
    }

    const script = document.createElement("script");

    script.id = scriptId;
    script.src = "https://secure.wayforpay.com/server/pay-widget.js";
    script.async = true;

    script.onload = () => {
      // console.log("WayForPay SDK loaded");
      initWidget();
    };

    script.onerror = () => {
      console.error("Failed to load WayForPay SDK");
    };

    document.body.appendChild(script);
  }, [paymentConfig]);

  return null;
};

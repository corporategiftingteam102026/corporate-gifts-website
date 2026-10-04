"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContactSuccess from "./ContactSuccess";
import type {
  EnquiryFormData,
  EnquirySubmitState,
} from "@/lib/enquiry-types";
import "./EnquiryForm.css";

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "";

const emptyForm: EnquiryFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  variant: "",
  quantity: "",
  message: "",
};

export default function EnquiryForm() {
  const searchParams = useSearchParams();

  const initialProduct = useMemo(
    () => searchParams.get("product") ?? "",
    [searchParams]
  );

  const initialVariant = useMemo(
    () => searchParams.get("variant") ?? "",
    [searchParams]
  );

  const [form, setForm] = useState<EnquiryFormData>({
    ...emptyForm,
    product: initialProduct,
    variant: initialVariant,
  });

  const [state, setState] = useState<EnquirySubmitState>("idle");
  const [error, setError] = useState("");

  function updateField(
    field: keyof EnquiryFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function validate() {
    if (!form.name.trim()) {
      return "Please enter your name.";
    }

    if (!form.email.trim() && !form.phone.trim()) {
      return "Please provide either an email address or phone number.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      return "Please enter a valid email address.";
    }

    if (form.phone.trim()) {
      const digits = form.phone.replace(/[^\d]/g, "");
      if (digits.length < 7 || digits.length > 15) {
        return "Please enter a valid phone number.";
      }
    }

    if (form.quantity && Number(form.quantity) <= 0) {
      return "Quantity must be greater than zero.";
    }

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!APPS_SCRIPT_URL) {
      setError(
        "The enquiry endpoint has not been configured yet. Add NEXT_PUBLIC_ENQUIRY_ENDPOINT when the Google Apps Script web app is deployed."
      );
      return;
    }

    setState("submitting");

    try {
      /*
        text/plain avoids a browser CORS preflight for a simple Apps Script
        POST. Apps Script parses e.postData.contents as JSON.
      */
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          ...form,
          source: window.location.href,
        }),
      });

      const result = await response.json();

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.message || "Unable to submit enquiry.");
      }

      setState("success");
    } catch (submissionError) {
      console.error(submissionError);
      setState("error");
      setError(
        "We couldn't send your enquiry right now. Please use the contact details above or try again shortly."
      );
    }
  }

  if (state === "success") {
    return (
      <ContactSuccess
        name={form.name}
        onReset={() => {
          setForm({
            ...emptyForm,
            product: initialProduct,
            variant: initialVariant,
          });
          setState("idle");
          setError("");
        }}
      />
    );
  }

  return (
    <section className="enquiry-section">
      <div className="enquiry-intro">
        <span>Tell us what you need</span>
        <h2>Send an enquiry</h2>
        <p>
          Share your contact details and gifting requirement. You only need to
          provide either an email address or a phone number.
        </p>

        {(initialProduct || initialVariant) && (
          <div className="enquiry-product-context">
            <small>Enquiring about</small>
            {initialProduct && <strong>{initialProduct}</strong>}
            {initialVariant && <span>Colour: {initialVariant}</span>}
          </div>
        )}
      </div>

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="enquiry-form-grid">
          <label className="enquiry-field">
            <span>Name <b>*</b></span>
            <input
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
            />
          </label>

          <label className="enquiry-field">
            <span>Organisation</span>
            <input
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              placeholder="Company or organisation"
            />
          </label>

          <label className="enquiry-field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@company.com"
            />
          </label>

          <label className="enquiry-field">
            <span>Phone</span>
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+91 98765 43210"
            />
          </label>

          {initialProduct && (
            <label className="enquiry-field">
              <span>Product</span>
              <input type="text" value={form.product} readOnly />
            </label>
          )}

          {initialVariant && (
            <label className="enquiry-field">
              <span>Colour / Variant</span>
              <input type="text" value={form.variant} readOnly />
            </label>
          )}

          <label className="enquiry-field">
            <span>Approx. quantity</span>
            <input
              type="number"
              min="1"
              inputMode="numeric"
              value={form.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
              placeholder="e.g. 50"
            />
          </label>

          <label className="enquiry-field enquiry-field-full">
            <span>Requirement / Message</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Tell us about the occasion, gifting requirement, customization, delivery timeline, etc."
            />
          </label>
        </div>

        <div className="contact-method-note">
          <span aria-hidden="true">i</span>
          <p>Please enter at least one contact method: email or phone.</p>
        </div>

        {error && (
          <p className="enquiry-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="enquiry-submit"
          type="submit"
          disabled={state === "submitting"}
        >
          <span>
            {state === "submitting" ? "Sending..." : "Send Enquiry"}
          </span>
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );
}

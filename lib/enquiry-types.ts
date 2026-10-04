export type EnquiryFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  variant: string;
  quantity: string;
  message: string;
};

export type EnquirySubmitState =
  | "idle"
  | "submitting"
  | "success"
  | "error";

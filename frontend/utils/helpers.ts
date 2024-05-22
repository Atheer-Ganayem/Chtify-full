export function isEmail(email: string): boolean {
  // Regular expression pattern for validating email addresses
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function extractFormData(formData: FormData, names: string[]) {
  const data: { [key: string]: string } = {};

  names.forEach(async name => {
    data[name] = formData.get(name) as string;
  });

  return data;
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import axios, { AxiosError } from "axios";
import { Plus, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ApiResponse {
  message: string;
}

export default function CompanyDetailsForm() {
  const [formData, setFormData] = useState({
    name: "",
    companyWebsite: "",
    accountOwner: "",
    employees: 0,
    linkedin: "",
    address: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await axios.post<ApiResponse>(
        "/api/companyDetails",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // Handle successful response
      setPending(false);
      toast.success(response.data.message);
      
    } catch (error) {
      // Use AxiosError type to define error
      const axiosError = error as AxiosError<{ message: string }>;
      // Handle errors from Axios
      if (axiosError.response) {
        const { status, data } = axiosError.response;
        if (status === 400 || status === 500) {
          setError(data.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("Failed to connect to the server.");
      }
      setPending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "employees" ? Number(value) : value,
    }));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="icon" className="bg-black">
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 z-[1050] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
            <Dialog.Title className="text-xl font-bold">
              Add New Company
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600">
              Fill out the form below to add a new Company.
            </Dialog.Description>
            {!!error && (
              <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                <TriangleAlert />
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  disabled={pending}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="companyWebsite"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Company Website
                </label>
                <Input
                  type="url"
                  name="companyWebsite"
                  disabled={pending}
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="Enter a valid URL"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="accountOwner"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Account Owner
                </label>
                <Input
                  type="text"
                  name="accountOwner"
                  disabled={pending}
                  value={formData.accountOwner}
                  onChange={handleChange}
                  placeholder="Enter Account Owner"
                />
              </div>
              <div>
                <label
                  htmlFor="employees"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Employees
                </label>
                <Input
                  type="number"
                  name="employees"
                  disabled={pending}
                  value={formData.employees}
                  onChange={handleChange}
                  placeholder="Enter number of employees"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  LinkedIn
                </label>
                <Input
                  type="url"
                  name="linkedin"
                  disabled={pending}
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Enter a valid URL"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  disabled={pending}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Dialog.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Button type="submit" disabled={pending}>
                  {pending ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

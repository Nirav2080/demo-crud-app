"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Form() {

const [formData, setFormData] = useState({
  name: "",
  domainName: "",
  accountOwner: "",
  employees: 0,
  linkedin: "",
  address: "",
});





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Form submitted successfully!");
        console.log("API Response:", data);
        setFormData({
          name: "",
          domainName: "",
          accountOwner: "",
          employees: 0,
          linkedin: "",
          address: "",
        });
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  return (
    <Dialog.Root>
      {/* Trigger Button */}
      <Dialog.Trigger asChild>
        <Button size="icon" className="bg-black">
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </Dialog.Trigger>

      {/* Modal Content */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
            <Dialog.Title className="text-xl font-bold">
              Add New Company
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600">
              Fill out the form below to add a new Company.
            </Dialog.Description>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Name
                </label>
                <Input name="name" placeholder="Enter name" required />
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  DomainName
                </label>
                <Input
                  name="domainName"
                  type="url"
                  placeholder="Enter a valid URL"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  AccountOwner
                </label>
                <Input
                  name="accountOwner"
                  type="text"
                  placeholder="Enter Your Domain Name"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Employees
                </label>
                <Input
                  name="employees"
                  type="number"
                  placeholder="Enter Your Domain Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 pb-2"
                >
                  Linkedin
                </label>
                <Input
                  name="linkedin"
                  type="url"
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
                  name="address"
                  placeholder="Enter Your Domain Name"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Dialog.Close asChild>
                  <Button variant="secondary">Cancel</Button>
                </Dialog.Close>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

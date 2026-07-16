"use client"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageLoading from "@/components/shared/page-loading"
import { getClientById, updateKycStatus } from "@/services/api/clients"
import { KycStatusBadge } from "@/components/clients/kyc-status-badge"
import { KycSectionCard } from "@/components/clients/kyc-section-card"
import { BoxedRadioOption } from "@/components/properties/add-property/boxed-option"

export default function ClientKycPage({ id }: { id: string }) {
  const router = useRouter()
  const [agreed, setAgreed] = useState(true)

  const { data, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id),
  })

  const mutation = useMutation({
    mutationFn: updateKycStatus,
    onSuccess: (_res, variables) => {
      toast.success(variables.status === "approved" ? "KYC approved" : "KYC rejected")
      router.push(`/clients/${id}`)
    },
    onError: () => toast.error("Failed to update KYC status"),
  })

  const client = data?.data

  if (isLoading || !client) {
    return <PageLoading />
  }

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>Investors</span>
        <span>›</span>
        <span>Details</span>
      </nav>

      <div className="flex items-center gap-2">
        <Link href={`/clients/${id}`} className="text-foreground">
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          KYC Form Details
        </h1>
        <span className="text-muted-foreground">• {client.name} •</span>
        <KycStatusBadge status={client.kyc_status} />
      </div>

      <KycSectionCard step={1} total={6} title="Section A" subtitle="Client's Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title" value="Mrs" />
          <Field label="Surname/name" value="Dahunsi" />
        </div>
        <Field label="First name & Other names" value="Lizzy Elizabeth" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Mobile Number" value="+234 1234 1234 1234" />
          <Field label="Other Number" value="+234 1234 1234 1234" />
        </div>
        <Field label="Email" value={client.email} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nationality" value="Nigeria" />
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground">Marital status</p>
            <div className="flex gap-3">
              <BoxedRadioOption label="Single" checked={false} onSelect={() => {}} />
              <BoxedRadioOption label="Married" checked onSelect={() => {}} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nationality" value="Nigeria" />
          <Field label="Date of Birth" value="23/09/2006" />
        </div>
        <Field label="Residential Address" value="Address" />
      </KycSectionCard>

      <KycSectionCard step={2} total={6} title="Section B" subtitle="Investment Subscription">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Property Type</p>
          <div className="flex gap-3">
            <BoxedRadioOption label="The Haven" checked onSelect={() => {}} />
            <BoxedRadioOption label="Ivie Towers" checked={false} onSelect={() => {}} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Select Property</p>
          {["2 Bedroom Apartment", "3 Bedroom Apartment", "4 Bedroom Duplex Penthouse"].map(
            (label, i) => (
              <BoxedRadioOption key={label} label={label} checked={i === 0} onSelect={() => {}} />
            )
          )}
        </div>
      </KycSectionCard>

      <KycSectionCard step={3} total={6} title="Section C" subtitle="Configuration Subscription">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Schedule of payment</p>
          <div className="flex gap-3">
            <BoxedRadioOption label="One-Time Payment" checked onSelect={() => {}} />
            <BoxedRadioOption label="12 months Payment Plan" checked={false} onSelect={() => {}} />
            <BoxedRadioOption label="24 months Payment Plan" checked={false} onSelect={() => {}} />
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Installment payment of?</p>
          <div className="flex gap-3">
            <BoxedRadioOption label="Pay All at Once" checked onSelect={() => {}} />
            <BoxedRadioOption label="20%" checked={false} onSelect={() => {}} />
            <BoxedRadioOption label="60%" checked={false} onSelect={() => {}} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Apartment Unit" value="Unit 2" />
          <Field label="Purchase balance shall be payable in?" value="14 months" />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Payment shall be made by?</p>
          <div className="flex gap-3">
            <BoxedRadioOption label="Cheque" checked={false} onSelect={() => {}} />
            <BoxedRadioOption label="Bank Drafts" checked onSelect={() => {}} />
            <BoxedRadioOption label="Wire Transfer" checked={false} onSelect={() => {}} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Note: Payment in ₦ will be at the prevailing open market rate, and kindly note that the
          amount on each cheque cannot exceed ₦8,999,000.99
        </p>
      </KycSectionCard>

      <KycSectionCard
        step={4}
        total={6}
        title="Section D"
        subtitle="Identification Documents"
      >
        <p className="text-sm text-muted-foreground">
          To comply with international regulatory standards and ensure the highest level of
          security for your investments, please kindly upload up-to-date identification
          documents.
        </p>
        <Field label="Bank Verification Number (BVN)" value="Unit number" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Passport Photograph</p>
            <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
              <Image
                src="/assets/images/avatars/avatar-1.png"
                alt="Passport"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              Proof of Residence (Utility Bill for the last 3 months)
            </p>
            <div className="flex h-40 items-center justify-center rounded-lg border border-border bg-secondary text-xs text-muted-foreground">
              Utility_Bill.pdf
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Identification</p>
          <div className="flex h-32 w-56 items-center justify-center rounded-lg border border-border bg-secondary text-xs text-muted-foreground">
            National ID Card
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Identification Number</p>
        </div>
      </KycSectionCard>

      <KycSectionCard step={5} total={6} title="Section E" subtitle="Title Deed">
        <Field label="Name as it should appear on the Title Deed" value="Lizzy Peperempe" />
        <Field label="Address as it should appear on the Title Deed" value="Address" />
      </KycSectionCard>

      <KycSectionCard step={6} total={6} title="Section F" subtitle="Terms & Conditions">
        <div className="max-h-64 space-y-3 overflow-y-auto rounded-lg border border-border p-4 text-xs leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">1. Property Description:</strong> The estate
            shall have facilities such as: gym barbell and water treatment plant, sewage
            treatment plant, swimming pool, 24-hour power supply, tarred landscaping and manned
            security with access control and CCTV cameras.
          </p>
          <p>
            <strong className="text-foreground">2. Offer:</strong> This offer is valid for a
            period of 5 working days from the date of dispatch, after which Prime Edge
            Development Limited reserves the right to revise the terms of the offer (including
            but not limited to an increase in the sale price) or withdraw the offer altogether.
          </p>
          <p>
            <strong className="text-foreground">3. Default:</strong> A default in the payment of
            any installments from the schedule within the specified periods shall result in a
            loss of the prevailing rate, interest charged on outstanding amounts, or termination
            of reservation.
          </p>
          <p>
            <strong className="text-foreground">4. Payment:</strong> All cheque(s) and bank
            draft(s) shall be issued in favour of Prime Edge Development Limited. Payments made
            by bank transfer shall be deemed received until returned Instrument has been
            confirmed.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="accent-brand-deepblue"
          />
          I/We confirm that I/We have read and understood the terms of offer and agree to be
          bound by the terms.
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Applicant Signature</label>
            <div className="flex h-16 items-center rounded-lg border border-border px-3 font-serif text-lg text-foreground">
              Lizzy
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Date</label>
            <Input readOnly value="8/09/2026" className="h-12" />
          </div>
        </div>
      </KycSectionCard>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate({ clientId: id, status: "rejected" })}
          className="rounded-full border-destructive text-destructive hover:bg-destructive/10"
        >
          Reject
        </Button>
        <Button
          disabled={mutation.isPending}
          onClick={() => mutation.mutate({ clientId: id, status: "approved" })}
          className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          Approve
        </Button>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input readOnly value={value} className="h-12" />
    </div>
  )
}

import IndustryLandingTemplate from "@/components/industry-landing-template";
import { SEO_CONFIGS } from "@/components/seo/page-seo";
import { Stethoscope, ClipboardList, UserCheck } from "lucide-react";

export default function HealthcareIndustry() {
  return (
    <IndustryLandingTemplate
      seoConfig={SEO_CONFIGS.industries.healthcare}
      industry="Healthcare"
      slug="healthcare"
      tagline="AI for Healthcare — QLD & Australia"
      heroDescription="Healthcare AI is sold as 'clinical decision support' — but most clinics' real bottleneck is the admin around patient care, not the care itself. We find the operational problem that's costing your clinicians time and your practice revenue."
      stats={[
        { value: "35%", label: "Less Admin Time" },
        { value: "50%", label: "Faster Referrals" },
        { value: "4 Weeks", label: "To Implement" },
        { value: "100%", label: "Health Data Compliant" },
      ]}
      bottleneckTitle="The Bottleneck Most Healthcare Practices Don't Know They Have"
      bottleneckDescription="Your clinicians didn't study for years to spend half their day on documentation. But that's the reality — referral letters, clinical notes, intake forms, Medicare claims, and follow-up scheduling eat into the time that should be spent on patients. The bottleneck isn't clinical skill — it's administrative overhead that compounds across every patient interaction."
      whatOthersSell="A 'clinical AI assistant' that requires 6 months of integration, a patient chatbot that can't handle real medical questions, and a HIPAA-first pitch that doesn't account for Australian health data regulations."
      whatWeActuallyDo="We map your practice's workflow from booking to billing, find the specific admin task eating the most clinician time, and build a compliant solution. Private infrastructure, My Health Records Act aware, integrated with your practice management system."
      useCases={[
        {
          icon: ClipboardList,
          title: "Clinical Documentation",
          subtitle: "Admin",
          description: "AI-assisted clinical notes and referral letters drafted from consultation data. Clinicians review and approve rather than type from scratch.",
          metric: "35% less documentation time",
        },
        {
          icon: Stethoscope,
          title: "Referral Processing",
          subtitle: "Operations",
          description: "Incoming referrals automatically triaged, key information extracted, and patient records pre-populated. No more manual transcription between systems.",
          metric: "50% faster referral handling",
        },
        {
          icon: UserCheck,
          title: "Patient Intake",
          subtitle: "Front Desk",
          description: "Digital intake forms that pre-populate patient records, check Medicare eligibility, and flag relevant medical history before the consultation begins.",
          metric: "40% faster check-in",
        },
      ]}
      caseStudyLink="/portfolio/healthcare-clinic"
      caseStudyLabel="Healthcare Case Study"
      faqs={[
        {
          question: "What about patient data privacy and health regulations?",
          answer: "Everything runs on private infrastructure — patient data never leaves your control. We build to Privacy Act 1988, My Health Records Act 2012, and Australian Digital Health Agency guidelines. Your data stays in Australia, on your systems.",
        },
        {
          question: "Does this integrate with our practice management software?",
          answer: "We integrate with major Australian PMS platforms including Best Practice, Medical Director, Cliniko, and others. The goal is to work within your existing workflow, not replace it.",
        },
        {
          question: "Will this replace our clinical staff?",
          answer: "No. Our tools reduce administrative burden so clinicians can focus on patient care. Every AI output goes through human review. We automate the paperwork around care, not the care itself.",
        },
        {
          question: "We're a small clinic with 3-5 practitioners. Is this worthwhile?",
          answer: "Often yes — small practices feel admin overhead the most because every hour counts. The free 15-minute audit will identify whether the ROI justifies it for your specific situation. If it doesn't, we'll tell you.",
        },
      ]}
    />
  );
}

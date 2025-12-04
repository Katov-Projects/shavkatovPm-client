export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

export interface Settings {
  _id?: string;
  heroTitle: string;
  heroSubtitleOne: string;
  heroSubtitleTwo: string;
  mainSectionYourFullName: string;
  blogSortBy?: "newest" | "oldest" | "mostViewed";
  aboutSectionTitle: string;
  aboutSectionMainParagraph: string;
  aboutSectionParagraphOne: string;
  aboutSectionParagraphTwo: string;
  faqSectionTitle: string;
  faqItems?: FaqItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateSettingsDto {
  heroTitle?: string;
  heroSubtitleOne?: string;
  heroSubtitleTwo?: string;
  mainSectionYourFullName?: string;
  blogSortBy?: "newest" | "oldest" | "mostViewed";
  aboutSectionTitle?: string;
  aboutSectionMainParagraph?: string;
  aboutSectionParagraphOne?: string;
  aboutSectionParagraphTwo?: string;
  faqSectionTitle?: string;
  faqItems?: FaqItem[];
}
